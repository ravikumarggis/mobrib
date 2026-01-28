// import React from "react";
// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";

// interface DynamicBarChartProps {
//   barChartStyle: {
//     color: string;
//     borderRadius: number;
//     columnWidth: number;
//     enabled: boolean;
//     strokeShow: boolean;
//     axisBorderShow: boolean;
//     axisTicksShow: boolean;
//     yaxisTitle: string;
//     minWidthCharbar: string;
//     titleofChart: string;
//     cartheight: number;
//   };
//   chartBarData: {
//     dataPoints: {
//       x: string;
//       y: number;
//       z: number;
//     }[];
//     series: {
//       name: string;
//       data: number[];
//     }[];
//   };
// }

// const DynamicBarChart: React.FC<DynamicBarChartProps> = ({
//   barChartStyle,
//   chartBarData,
// }) => {
//   const options: ApexOptions = {
//     colors: [`${barChartStyle?.color}`],
//     chart: {
//       fontFamily: "Outfit, sans-serif",
//       type: "bar",
//       toolbar: {
//         show: false,
//       },
//       stacked: false,
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: barChartStyle?.columnWidth,
//         borderRadius: barChartStyle?.borderRadius,
//         borderRadiusApplication: "end",
//       },
//     },
//     dataLabels: {
//       enabled: barChartStyle?.enabled,
//     },
//     stroke: {
//       show: barChartStyle?.strokeShow,
//       width: 4,
//       colors: ["transparent"],
//     },
//     xaxis: {
//       categories: chartBarData?.dataPoints?.map((item: any) => item?.x),
//       title: {
//         text: "SYMBOL",
//       },
//       axisBorder: {
//         show: barChartStyle?.axisBorderShow,
//       },
//       axisTicks: {
//         show: barChartStyle?.axisTicksShow,
//       },
//     },
//     legend: {
//       show: true,
//       position: "top",
//       horizontalAlign: "left",
//       fontFamily: "Outfit",
//     },
//     yaxis: {
//       title: {
//         text: barChartStyle?.yaxisTitle,
//       },
//       labels: {
//         formatter: (val: number) => `${val}`,
//       },

//       showAlways: true,
//       showForNullSeries: true,
//       forceNiceScale: true,
//     },
//     grid: {
//       yaxis: {
//         lines: {
//           show: true,
//         },
//       },
//       padding: {
//         left: 20,
//         right: 10,
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//     tooltip: {
//       custom: function ({ dataPointIndex }) {
//         const x = chartBarData?.dataPoints[dataPointIndex].x;
//         const y = chartBarData?.dataPoints[dataPointIndex].y;
//         const z = chartBarData?.dataPoints[dataPointIndex].z;
//         const isDarkMode = document.documentElement.classList.contains("dark");
//         const textColor = isDarkMode ? "color: white;" : "color: black;";
//         return `
//           <div style="padding: 8px; ${textColor}">
//             <strong>Symbol :</strong> ${x}<br/>
//             <strong>Total USDT Value :</strong> ${y}<br/>
//             <strong>Total Quantity :</strong> ${z}
//           </div>
//         `;
//       },
//     },
//   };

//   const calculateChartWidth = () => {
//     const minWidth = 800;
//     const itemWidth = 80;
//     const calculatedWidth = Math.max(
//       minWidth,
//       chartBarData?.dataPoints?.length * itemWidth
//     );
//     return `${calculatedWidth}px`;
//   };

//   return (
//     <div className="relative w-full">
//       <div className="absolute left-0 top-0 bottom-0 w-[60px] bg-transparent z-10 pointer-events-none" />
//       <div className="ml-[60px] overflow-x-auto overflow-y-hidden">
//         <div
//           className={`${barChartStyle?.minWidthCharbar}`}
//           style={{
//             width: calculateChartWidth(),
//             minWidth: "100%",
//           }}
//         >
//           <Chart
//             options={options}
//             series={chartBarData?.series}
//             type="bar"
//             height={barChartStyle?.cartheight}
//             width="100%"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DynamicBarChart;

/********************************************************************************************/
/********************************************************************************************/
/*******************************************************************************************/
/*******************************************************************************************/

// import React, { useMemo } from "react";
// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";

// interface DynamicBarChartProps {
//   barChartStyle: {
//     color: string;
//     borderRadius: number;
//     columnWidth: number;
//     enabled: boolean;
//     strokeShow: boolean;
//     axisBorderShow: boolean;
//     axisTicksShow: boolean;
//     yaxisTitle: string;
//     minWidthCharbar: string;
//     titleofChart: string;
//     cartheight: number;
//   };
//   chartBarData: {
//     dataPoints: {
//       x: string;
//       y: number;
//       z: number;
//     }[];
//     series: {
//       name: string;
//       data: number[];
//     }[];
//   };
// }

// const DynamicBarChart: React.FC<DynamicBarChartProps> = ({
//   barChartStyle,
//   chartBarData,
// }) => {
//   // compute y values for tick labels
//   // const yValues = useMemo(() => {
//   //   const dataY = chartBarData?.dataPoints?.map((d) => d.y) || [];
//   //   if (dataY.length === 0) return [];
//   //   const max = Math.max(...dataY);
//   //   const min = Math.min(...dataY);
//   //   const step = (max - min) / 4;
//   //   return [max, max - step, max - 2 * step, max - 3 * step, min].map((v) =>
//   //     Number(v.toFixed(2))
//   //   );
//   // }, [chartBarData]);

//   const yValues = useMemo(() => {
//     const dataY = chartBarData?.dataPoints?.map((d) => d.y) || [];
//     if (dataY.length === 0) return [];
//     const max = Math.max(...dataY);
//     const min = 0; // ✅ force start from zero
//     const step = (max - min) / 4;
//     return [max, max - step, max - 2 * step, max - 3 * step, min].map((v) =>
//       Number(v.toFixed(2))
//     );
//   }, [chartBarData]);

//   const options: ApexOptions = {
//     colors: [barChartStyle?.color],
//     chart: {
//       fontFamily: "Outfit, sans-serif",
//       type: "bar",
//       toolbar: { show: false },
//       stacked: false,
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: barChartStyle?.columnWidth,
//         borderRadius: barChartStyle?.borderRadius,
//         borderRadiusApplication: "end",
//       },
//     },
//     dataLabels: { enabled: barChartStyle?.enabled },
//     stroke: {
//       show: barChartStyle?.strokeShow,
//       width: 4,
//       colors: ["transparent"],
//     },
//     xaxis: {
//       categories: chartBarData?.dataPoints?.map((item) => item.x),
//       title: { text: "SYMBOL" },
//       axisBorder: { show: barChartStyle?.axisBorderShow },
//       axisTicks: { show: barChartStyle?.axisTicksShow },
//     },
//     legend: {
//       show: true,
//       position: "top",
//       horizontalAlign: "left",
//       fontFamily: "Outfit",
//     },
//     yaxis: {
//       show: false, // HIDE Apex y-axis (we'll render our own fixed one),
//       labels: {
//         formatter: (val: number) => `${val}`,
//       },
//     },
//     grid: {
//       yaxis: { lines: { show: true } },
//       padding: { left: 0, right: 10 },
//     },
//     fill: { opacity: 1 },
//     tooltip: {
//       custom: ({ dataPointIndex }) => {
//         const x = chartBarData?.dataPoints[dataPointIndex]?.x;
//         const y = chartBarData?.dataPoints[dataPointIndex]?.y;
//         const z = chartBarData?.dataPoints[dataPointIndex]?.z;
//         const isDark = document.documentElement.classList.contains("dark");
//         const textColor = isDark ? "color:white;" : "color:black;";
//         return `
//           <div style="padding:8px;${textColor}">
//             <strong>Symbol:</strong> ${x}<br/>
//             <strong>Total USDT Value:</strong> ${y}<br/>
//             <strong>Total Quantity:</strong> ${z}
//           </div>
//         `;
//       },
//     },
//   };

// const calculateChartWidth = () => {
//   const minWidth = 800;
//   const itemWidth = 80;
//   const calcWidth = Math.max(
//     minWidth,
//     chartBarData?.dataPoints?.length * itemWidth
//   );
//   return `${calcWidth}px`;
// };

// return (
//   <div className="w-full flex">
//     {/* Fixed Y-axis */}
//     <div className="sticky left-12 z-20  flex flex-col justify-between items-end border-r border-gray-200 dark:border-gray-700 px-0  bg-amber-500">
//       <div className="flex flex-col justify-between h-full bg-red-500">
//         {yValues?.map((val) => (
//           <span
//             key={val}
//             className="text-sm text-gray-700 dark:text-gray-200"
//             style={{ lineHeight: "1.2rem" }}
//           >
//             {val}
//           </span>
//         ))}
//       </div>
//       <div className="text-xs text-center absolute top-1/2 font-medium text-gray-600 dark:text-gray-300 mt-2 rotate-[-90deg] origin-bottom-left whitespace-nowrap bg-green-700">
//         {barChartStyle?.yaxisTitle}
//       </div>
//     </div>

//     {/* Scrollable Chart */}
//     <div className="overflow-x-auto overflow-y-hidden w-full h-full">
//       <div
//         className={`${barChartStyle?.minWidthCharbar}`}
//         style={{ width: calculateChartWidth(), minWidth: "100%" }}
//       >
//         <Chart
//           options={options}
//           series={chartBarData?.series}
//           type="bar"
//           height={barChartStyle?.cartheight}
//           width="100%"
//         />
//       </div>
//     </div>
//   </div>
// );

/***********************************************************Hit and run &&&&&&&&&&&&&&&&&&&&& */
/**********************************************************************************************/
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DynamicBarChartProps {
  barChartStyle: {
    color: string;
    borderRadius: number;
    columnWidth: number;
    enabled: boolean;
    strokeShow: boolean;
    axisBorderShow: boolean;
    axisTicksShow: boolean;
    yaxisTitle: string;
    minWidthCharbar: string;
    titleofChart: string;
    cartheight: number;
  };
  chartBarData: {
    dataPoints: {
      x: string;
      y: number;
      z: number;
    }[];
    series: {
      name: string;
      data: number[];
    }[];
  };
}

// const DynamicBarChart: React.FC<DynamicBarChartProps> = ({
//   barChartStyle,
//   chartBarData,
// }) => {
//   // const baseYaxis: ApexOptions["yaxis"] = {
//   //   show: true,
//   //   showAlways: true,
//   //   showForNullSeries: true,
//   //   forceNiceScale: true,
//   //   title: {
//   //     text: barChartStyle?.yaxisTitle,
//   //     style: { fontFamily: "Outfit", fontWeight: 600 },
//   //   },
//   // labels: {
//   //   formatter: (val: number) => `${val}`,
//   //   style: { fontFamily: "Outfit", fontSize: "12px" },
//   // },
//   // };

//   // // ✅ Chart with only Y-axis (fixed, no bars)
//   // const yAxisOptions: ApexOptions = {
//   //   chart: {
//   //     type: "bar",
//   //     animations: { enabled: false },
//   //     toolbar: { show: false },
//   //     sparkline: { enabled: true },
//   //   },
//   //   grid: { show: false },
//   //   xaxis: {
//   //     labels: { show: false },
//   //     axisTicks: { show: false },
//   //     axisBorder: { show: false },
//   //   },
//   //   yaxis: baseYaxis,
//   //   series: [{ name: "empty", data: [] }],
//   // };

//   // ✅ Chart with bars and X-axis (scrollable, no Y-axis)

//   const barOptions: ApexOptions = {
//     colors: [`${barChartStyle?.color}`],
//     chart: {
//       fontFamily: "Outfit, sans-serif",
//       type: "bar",
//       toolbar: { show: false },
//       stacked: false,
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: barChartStyle?.columnWidth,
//         borderRadius: barChartStyle?.borderRadius,
//         borderRadiusApplication: "end",
//       },
//     },
//     dataLabels: { enabled: barChartStyle?.enabled },
//     stroke: {
//       show: barChartStyle?.strokeShow,
//       width: 4,
//       colors: ["transparent"],
//     },
//     xaxis: {
//       categories: chartBarData?.dataPoints?.map((item) => item?.x),
//       title: { text: "SYMBOL" },
//       axisBorder: { show: barChartStyle?.axisBorderShow },
//       axisTicks: { show: barChartStyle?.axisTicksShow },
//     },
//     legend: {
//       show: true,
//       position: "top",
//       horizontalAlign: "left",
//       fontFamily: "Outfit",
//     },
//     yaxis: { show: false }, // ❌ hide Y-axis in scrollable chart
//     grid: {
//       yaxis: { lines: { show: true } },
//       padding: { left: 0, right: 10 },
//     },
//     tooltip: {
//       custom: function ({ dataPointIndex }) {
//         const x = chartBarData?.dataPoints[dataPointIndex].x;
//         const y = chartBarData?.dataPoints[dataPointIndex].y;
//         const z = chartBarData?.dataPoints[dataPointIndex].z;
//         const isDarkMode = document.documentElement.classList.contains("dark");
//         const textColor = isDarkMode ? "color: white;" : "color: black;";
//         return `
//           <div style="padding: 8px; ${textColor}">
//             <strong>Symbol :</strong> ${x}<br/>
//             <strong>Total USDT Value :</strong> ${y}<br/>
//             <strong>Total Quantity :</strong> ${z}
//           </div>
//         `;
//       },
//     },
//     fill: { opacity: 1 },
//   };

//   const barOptions2: ApexOptions = {
//     colors: [`${barChartStyle?.color}`],
//     chart: {
//       // fontFamily: "Outfit, sans-serif",
//       // type: "bar",
//       // toolbar: { show: false },
//       // stacked: false,
//     },
//     plotOptions: {
//       bar: {
//         // horizontal: false,
//         // columnWidth: barChartStyle?.columnWidth,
//         // borderRadius: barChartStyle?.borderRadius,
//         // borderRadiusApplication: "end",
//       },
//     },
//     // dataLabels: { enabled: barChartStyle?.enabled },
//     stroke: {
//       // show: barChartStyle?.strokeShow,
//       // width: 4,
//       // colors: ["transparent"],
//     },
//     xaxis: {
//       // categories: chartBarData?.dataPoints?.map((item) => item?.x),
//       // title: { text: "SYMBOL" },
//       labels: {
//         show: false, // ← This hides the x-axis values (0-10)
//       },
//       axisBorder: { show: false },
//       axisTicks: { show: false },
//     },
//     legend: {
//       show: false,
//       // position: "top",
//       // horizontalAlign: "left",
//       // fontFamily: "Outfit",
//     },
//     // yaxis: {
//     //   show: true,
//     //   labels: {
//     //     formatter: (val: number) => `${val}`,
//     //     style: { fontFamily: "Outfit", fontSize: "12px" },
//     //   },
//     // }, // ❌ hide Y-axis in scrollable chart

//     yaxis: {
//       show: true,
//       showAlways: true,
//       showForNullSeries: true,
//       forceNiceScale: true,
//       title: {
//         text: barChartStyle?.yaxisTitle,
//         style: { fontFamily: "Outfit", fontWeight: 600 },
//       },
//       labels: {
//         formatter: (val: number) => `${val}`,
//         style: { fontFamily: "Outfit", fontSize: "12px" },
//       },
//     },
//     grid: {
//       yaxis: { lines: { show: false } },
//       // padding: { left: 0, right: 10 },
//     },
//   };

//   const calculateChartWidth = () => {
//     const minWidth = 800;
//     const itemWidth = 80;
//     const calculatedWidth = Math.max(
//       minWidth,
//       chartBarData?.dataPoints?.length * itemWidth
//     );
//     return `${calculatedWidth}px`;
//   };

//   return (
//     <div className="w-full">
//       {/* Fixed Y-axis */}
//       {/* <div
//         className="sticky left-0 z-20 bg-amber-400"
//         style={{ width: "80px" }}
//       >
//         <Chart
//           options={yAxisOptions}
//           series={[]}
//           type="bar"
//           height={barChartStyle?.cartheight}
//           width="80px"
//         />
//       </div> */}

//       {/* Scrollable chart */}
//       <div className="flex items-center">
//         <div
//           // style={{
//           //   width: calculateChartWidth(),
//           //   minWidth: "100%",
//           // }}
//           className="w-23"
//         >
//           <Chart
//             options={barOptions2}
//             series={[]}
//             type="bar"
//             height={barChartStyle?.cartheight}
//             width="100%"
//           />
//         </div>
//         <div className="overflow-x-auto overflow-y-hidden flex-1">
//           <div
//             style={{
//               width: calculateChartWidth(),
//               minWidth: "100%",
//             }}
//           >
//             <Chart
//               options={barOptions}
//               series={chartBarData?.series}
//               type="bar"
//               height={barChartStyle?.cartheight}
//               width="100%"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const DynamicBarChart: React.FC<DynamicBarChartProps> = ({
  barChartStyle,
  chartBarData,
}) => {
  // Calculate min and max values for consistent y-axis scaling
  const getYAxisMinMax = () => {
    if (!chartBarData?.series?.length) return { min: 0, max: 10 };

    const allValues = chartBarData.series.flatMap((series) => series.data);
    const maxValue = Math.max(...allValues);

    // Always start from 0 and add some padding to the max value
    return {
      min: 0, // Always start from 0
      max: Math.ceil(maxValue * 1.1), // 10% padding
    };
  };

  const { min, max } = getYAxisMinMax();

  const barOptions: ApexOptions = {
    colors: [`${barChartStyle?.color}`],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      toolbar: { show: false },
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: barChartStyle?.columnWidth,
        borderRadius: barChartStyle?.borderRadius,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: barChartStyle?.enabled },
    stroke: {
      show: barChartStyle?.strokeShow,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartBarData?.dataPoints?.map((item) => item?.x),
      title: { text: "SYMBOL" },
      axisBorder: { show: barChartStyle?.axisBorderShow },
      axisTicks: { show: barChartStyle?.axisTicksShow },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      show: false,
      // tickAmount: 6,
      min: min,
      max: max,
    },
    grid: {
      yaxis: { lines: { show: false } },
      padding: { left: 0, right: 10 },
    },
    tooltip: {
      custom: function ({ dataPointIndex }) {
        const x = chartBarData?.dataPoints[dataPointIndex].x;
        const y = chartBarData?.dataPoints[dataPointIndex].y;
        const z = chartBarData?.dataPoints[dataPointIndex].z;
        const isDarkMode = document.documentElement.classList.contains("dark");
        const textColor = isDarkMode ? "color: white;" : "color: black;";
        return `
          <div style="padding: 8px; ${textColor}">
            <strong>Symbol :</strong> ${x}<br/>
            <strong>Total USDT Value :</strong> ${y}<br/>
            <strong>Total Quantity :</strong> ${z}
          </div>
        `;
      },
    },
    fill: { opacity: 1 },
  };

  const barOptions2: ApexOptions = {
    colors: [`${barChartStyle?.color}`],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: barChartStyle?.columnWidth,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: false,
    },
    yaxis: {
      show: true,
      min: min, // Always 0
      max: max, // Max value with padding
      tickAmount: 6,
      forceNiceScale: true,
      title: {
        text: barChartStyle?.yaxisTitle,
        // style: { fontFamily: "Outfit", fontWeight: 600 },
      },
      labels: {
        formatter: (val: number) => `${val}`,
        style: { fontFamily: "Outfit", fontSize: "12px" },
      },
    },
    grid: {
      yaxis: { lines: { show: false } },
    },
  };

  const calculateChartWidth = () => {
    const minWidth = 800;
    const itemWidth = 80;
    const calculatedWidth = Math.max(
      minWidth,
      chartBarData?.dataPoints?.length * itemWidth
    );
    return `${calculatedWidth}px`;
  };

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="w-23  -mt-8 ">
          <Chart
            options={barOptions2}
            series={[]} // Empty series for y-axis only
            type="bar"
            height={barChartStyle?.cartheight}
            width="100%"
          />
        </div>

        <div className="overflow-x-auto overflow-y-hidden flex-1">
          <div
            style={{
              width: calculateChartWidth(),
              minWidth: "100%",
            }}
          >
            <Chart
              options={barOptions}
              series={chartBarData?.series}
              type="bar"
              height={barChartStyle?.cartheight}
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicBarChart;
