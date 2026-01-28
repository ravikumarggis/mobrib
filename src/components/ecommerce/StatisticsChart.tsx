import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { useGetLineChart } from "../../queries/dashboard";
import { useDebounce } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";
import LoadingScreen from "../common/LoadingScreen";
import Select from "../form/Select";
import { useCoinList } from "../../queries/token-management";

type TimePeriod = "Monthly" | "Quarterly" | "Annually";

export default function StatisticsChart() {
  const { data: coinData } = useCoinList();
  const [selectedSymobl, setselectedSymobl] = useState("INR");
  const [selected, setSelected] = useState<TimePeriod>("Monthly");
  const [filter, setFilter] = useState({
    selected: selected,
    symbol: selectedSymobl,
  });
  const debouncedFilter = useDebounce(filter, 1000);
  const { data, isLoading } = useGetLineChart(debouncedFilter);

  const filterChartWithdrawDepositData = useMemo(() => {
    const DepositData =
      data?.depositData?.map((item: { total: any }) => item?.total) ?? [];
    const DepositMonth =
      data?.depositData?.map((item: { total: any }) => item?.month) ?? [];
    const DepositYear =
      data?.depositData?.map((item: { total: any }) => item?.year) ?? [];

    const DepositQuater =
      data?.depositData?.map((item: { total: any }) => item?.quarter) ?? [];

    const withdraData =
      data?.withdraData?.map((item: { total: any }) => item?.total) ?? [];
    return {
      DepositData,
      DepositMonth,
      DepositYear,
      withdraData,
      DepositQuater,
    };
  }, [data]);

  const coinOptions: CoinOption[] = (coinData?.result || [])?.map(
    (coin: { symbol: string; id: string }) => ({
      label: coin.symbol,
      value: coin.symbol,
    })
  );

  const getCategories = (period: TimePeriod) => {
    switch (period) {
      case "Monthly":
        return filterChartWithdrawDepositData?.DepositMonth;
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
      case "quarterly":
        // return ["Q1", "Q2", "Q3", "Q4"];
        return filterChartWithdrawDepositData?.DepositQuater;

      case "annually":
        return filterChartWithdrawDepositData?.DepositYear;

      default:
        return [];
    }
  };

  const handleSelectChange = (value: string) => {
    setselectedSymobl(value);
    setFilter({ ...filter, symbol: value });
  };

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#FF4646"],
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
        formatter: (value) => `${selectedSymobl} ${value.toLocaleString()}`,
      },
      title: { text: "", style: { fontSize: "0px" } },
    },
  };

  const series = [
    {
      name: "Deposit",
      // data: [
      //   5000, 4200, 6000, 5500, 7000, 6500, 8000, 7500, 9000, 8500, 9500, 10000,
      // ],
      data:
        filterChartWithdrawDepositData?.DepositData ||
        Array(getCategories(selected).length).fill(0),
    },
    {
      name: "Withdrawal",
      data:
        filterChartWithdrawDepositData?.withdraData ||
        Array(getCategories(selected).length).fill(0),
      // data: [
      //   7000, 4200, 8000, 5500, 7000, 600, 8000, 7500, 9000, 8500, 9500, 10000,
      // ],
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
            Transaction Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            {selected} deposit and withdrawal amounts
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <Select
            options={coinOptions}
            placeholder="Select an Option"
            value={selectedSymobl}
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
          <ChartTab
            selected={selected}
            setSelected={(value: any) => {
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
