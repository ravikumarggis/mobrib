// import Papa from "papaparse";
// import Button from "../ui/button/Button";
// import { useEffect } from "react";
// import NeonSpinner from "../common/NeonSpinner";

// const CSVDownloader = ({
//   data,
//   filename,
//   onClick,
//   isCall,
//   isSuccess,
//   isCSVloading = false,
//   text = "Download CSV",
// }) => {
//   const formatHeader = (header: any) => {
//     return header;

//     // const firstWord = header.split(/(?=[A-Z_])/)[0];

//     // return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
//   };

//   const downloadCSV = () => {
//     let formattedData = data;
//     if (data.length >= 0 && typeof data[0] === "object") {
//       formattedData = data.map((row: any) => {
//         const newRow = {};
//         Object.keys(row).forEach((key) => {
//           newRow[formatHeader(key)] = row[key];
//         });
//         return newRow;
//       });
//     }

//     const csv = Papa.unparse(formattedData);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", filename || "data.csv");
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       downloadCSV();
//     }
//   }, [isSuccess]);

//   return (
//     <Button
//       // className="w-full py-3 sm:ml-3"
//       className="w-full py-3 sm:ml-0"
//       onClick={isCall == "noCall" ? downloadCSV : onClick}
//       startIcon={isCSVloading && <NeonSpinner size="4" />}
//       disabled={isCSVloading}
//     >
//       {!isCSVloading ? text : ""}
//     </Button>
//   );
// };

// export default CSVDownloader;





import Papa from "papaparse";
import Button from "../ui/button/Button";
import { useEffect, useCallback } from "react";
import NeonSpinner from "../common/NeonSpinner";

type CSVRow = Record<string, unknown>;

type CSVDownloaderProps = {
  data: CSVRow[];
  filename?: string;
  onClick?: () => void;
  isCall?: "noCall" | string;
  isSuccess?: boolean;
  isCSVloading?: boolean;
  isDownloadCsv?: boolean;
  text?: string;
};

const CSVDownloader = ({
  data = [],
  filename = "data.csv",
  onClick,
  isCall,
  isSuccess,
  isCSVloading = false,
  isDownloadCsv,
  text = "Download CSV",
}: CSVDownloaderProps) => {
  const downloadCSV = useCallback(() => {
    if (!data || data.length === 0) return;

    const formattedData: CSVRow[] = data.map((row) => {
      const newRow: CSVRow = {};
      Object.keys(row).forEach((key) => {
        newRow[key] = row[key];
      });
      return newRow;
    });

    const csv = Papa.unparse(formattedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }, [data, filename]);

  useEffect(() => {
    if (isSuccess && data.length > 0 && isDownloadCsv) {
      downloadCSV();
    }
  }, [isSuccess, data.length, isDownloadCsv, downloadCSV]);

  return (
    <Button
      className="w-full py-3 sm:ml-0"
      onClick={isCall === "noCall" ? downloadCSV : onClick}
      startIcon={isCSVloading && <NeonSpinner size="4" />}
      disabled={isCSVloading}
    >
      {!isCSVloading ? text : ""}
    </Button>
  );
};

export default CSVDownloader;
