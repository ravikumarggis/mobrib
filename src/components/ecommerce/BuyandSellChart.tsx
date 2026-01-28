import { useMemo, useState } from "react";
import DynamicBarChart from "../../components/dynamicBarChart/DynamicBarChart";
import { useBuyandSell } from "../../queries/dashboard";
import Select from "../form/Select";
import Label from "../form/Label";
import LoadingScreen from "../common/LoadingScreen";
const BuyandSellChart = () => {
  const [selectedValue, setselectedValue] = useState<string>("buy");
  const { data: BuySellData, isLoading } = useBuyandSell(selectedValue);
  const options = [
    { label: "Buy", value: "buy" },
    { label: "Sell", value: "sell" },
  ];

  const chartBarData = useMemo(() => {
    const data =
      BuySellData?.result?.map((item: any) =>
        Number(item?.totalUSDT ?? 0).toFixed(4)
      ) ?? [];
    const series = [{ name: "USDT Value", data: data }];
    const dataPoints =
      BuySellData?.result?.map((item: any) => ({
        x: item?.symbol,
        y: Number(item?.totalUSDT ?? 0).toFixed(4),
        z: Number(item?.total ?? 0).toFixed(4),
      })) ?? [];
    return { series, dataPoints };
  }, [BuySellData]);

  // const chartBarData = useMemo(() => {
  //   const staticData = [
  //     { symbol: "BTC", totalUSDT: 6823.32, total: 1.2 },
  //     { symbol: "ETH", totalUSDT: 4354.15, total: 3.5 },
  //     { symbol: "BNB", totalUSDT: 3123.45, total: 5.0 },
  //     { symbol: "XRP", totalUSDT: 1789.30, total: 400 },
  //     { symbol: "ADA", totalUSDT: 2488.11, total: 300 },
  //     { symbol: "SOL", totalUSDT: 3990.27, total: 20 },
  //     { symbol: "DOT", totalUSDT: 2175.99, total: 50 },
  //     { symbol: "MATIC", totalUSDT: 1627.52, total: 100 },
  //     { symbol: "AVAX", totalUSDT: 2840.73, total: 25 },
  //     { symbol: "DOGE", totalUSDT: 1254.44, total: 5000 },
  //     { symbol: "SHIB", totalUSDT: 1067.67, total: 100000 },
  //     { symbol: "LTC", totalUSDT: 5732.12, total: 15 },
  //     { symbol: "TRX", totalUSDT: 2480.28, total: 800 },
  //     { symbol: "NEAR", totalUSDT: 3374.91, total: 60 },
  //   ];

  //   const data = staticData.map((item) => Number(item.totalUSDT.toFixed(4)));
  //   const series = [{ name: "USDT Value", data }];

  //   const dataPoints = staticData.map((item) => ({
  //     x: item.symbol,
  //     y: Number(item.totalUSDT.toFixed(4)),
  //     z: Number(item.total.toFixed(4)),
  //   }));

  //   return { series, dataPoints };
  // }, []);

  const barChartStyle = {
    color: selectedValue === "buy" ? "#008000" : "#FF0000",
    borderRadius: 1,
    columnWidth: 35,
    enabled: false,
    strokeShow: false,
    axisBorderShow: true,
    axisTicksShow: true,
    yaxisTitle: "TOTAL USDT VALUE",
    cartheight: 400,
    minWidthCharbar: "w-full min-w-[600px]",
    titleofChart: "Buy / sell Statistics",
  };

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Buy and Sell Statistics
            </h3>
          </div>
          <div className="flex flex-col items-start w-full sm:max-w-[60%] md:max-w-[40%] lg:max-w-[30%] xl:max-w-[20%]">
            <Label>Select Buy or Sell</Label>
            <Select
              options={options}
              placeholder="Select an Option"
              value={selectedValue}
              onChange={(value) => {
                setselectedValue(value);
              }}
              className="dark:bg-dark-900"
            />
          </div>
        </div>
        <DynamicBarChart
          barChartStyle={barChartStyle}
          chartBarData={chartBarData}
        />
      </div>
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default BuyandSellChart;
