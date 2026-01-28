import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { useGetLineChart } from "../../queries/dashboard";
import { useDebounce } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";
import LoadingScreen from "../common/LoadingScreen";

type TimePeriod = "Monthly" | "Quarterly" | "Annually";

export default function UserSignUpStatisticsChart() {
  const [selected, setSelected] = useState<TimePeriod>("Monthly");
  const [filter, setFilter] = useState({
    selected: selected,
    symbol: "",
  });

  const debouncedFilter = useDebounce(filter, 1000);
  const { data, isLoading } = useGetLineChart(debouncedFilter);

  const filterChartUserSignUpData = useMemo(() => {
    const signupData =
      data?.monthlySignUp?.map((item: { total: any }) => item?.total) ?? [];
    const signupMonth =
      data?.monthlySignUp?.map((item: { total: any }) => item?.month) ?? [];
    const signupYear =
      data?.monthlySignUp?.map((item: { total: any }) => item?.year) ?? [];
    const SignupQuater =
      data?.monthlySignUp?.map((item: { total: any }) => item?.quarter) ?? [];
    return { signupData, signupMonth, signupYear, SignupQuater };
  }, [data]);

  // Generate categories based on selected time period
  const getCategories = (period: TimePeriod) => {
    switch (period) {
      case "Monthly":
        // return [
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep",
        //   "Oct",
        //   "Nov",
        //   "Dec",
        // ];
        return filterChartUserSignUpData?.signupMonth;
      case "quarterly":
        // return ["Q1", "Q2", "Q3", "Q4"];
        return filterChartUserSignUpData?.SignupQuater;

      case "annually":
        return filterChartUserSignUpData?.signupYear;

      default:
        return [];
    }
  };

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
      animations: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      x: { format: "dd MMM yyyy" },
    },
    xaxis: {
      type: "category",
      categories: getCategories(selected),
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: (value) => `Users - ${value.toFixed(0)}`,
      },
      title: { text: "", style: { fontSize: "0px" } },
    },
  };

  const series = [
    {
      name: "Signup",
      data:
        filterChartUserSignUpData?.signupData ||
        Array(getCategories(selected).length).fill(0),
    },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Signup Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Monthly User Signup Statistics
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab
            selected={selected}
            setSelected={(value) => {
              setSelected(value);
              setFilter((prev) => ({ ...prev, selected: value }));
            }}
          />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
