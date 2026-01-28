import React, { useMemo, useState } from "react";
import CommonTable from "../common/CommonTable";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import moment from "moment";
import { useDebounce } from "@uidotdev/usehooks";
import { useUserInstallmentHistory } from "../../queries/user-management";
import LoadingScreen from "../common/LoadingScreen";
import { DateTimeFormates, statusColor, statusText } from "../../utils";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  selectedId: string | number;
};
interface EmaiTableRowData {
  sub_id: string;
  installmentNumber: string;
  monthlyAmount: string;
  penalityFee: string;
  paidAt: string;
  status: string;
}
const columnHelper = createColumnHelper<EmaiTableRowData>();
const ViewEmiDetails: React.FC<Props> = ({
  isOpen,
  onClose,
  title = "Details",
  selectedId,
}) => {
  if (!isOpen) return null;

  const [filter, setFilter] = useState({});
  const debouncedFilter = useDebounce(filter, 1000);
  const { data, isLoading } = useUserInstallmentHistory(debouncedFilter, selectedId);
  const planDetails = useMemo(() => { return data?.data }, [data]);


  const columns = [
    columnHelper.accessor("sub_id", {
      header: "Subscription Id",
      cell: (info) => info.getValue() || "--",
    }),
    columnHelper.accessor("installmentNumber", {
      header: "Installment No.",
      cell: (info) => info.getValue() || "--",
    }),

    columnHelper.accessor("monthlyAmount", {
      header: "Paid Amount",
      cell: (info) => info.getValue() || "--",
    }),
    columnHelper.accessor("penalityFee", {
      header: "Penality Fee",
      cell: (info) => info.getValue() || "--",
    }),

    columnHelper.accessor("paidAt", {
      header: "Paid Date",
      cell: (info) => DateTimeFormates(info.getValue())

      // cell: (info) =>
      //   info.getValue() ? moment(info.getValue())?.format("llll") : "--",
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();

        return (
          <span className={`${statusColor(value)} capitalize`}>
            {statusText(value) || "--"}
          </span>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: planDetails?.result ?? [],
    columns: columns ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  const tableData = {
    table,
    filter,
    setFilter,
    type: "kycsd",
    totalPage: "no",
  };

  return (
    <div className="inset-0 flex h-screen items-center justify-center bg-opacity-50 backdrop-blur-xs absolute bg-black/10 z-50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-[95%] xl:max-w-[50%] px-1 py-4 sm:p-4 relative max-h-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-black dark:text-white"
        >
          ✕
        </button>

        <h2 className="text-center text-base md:text-lg font-semibold mb-0 dark:text-white text-gray-900">
          {title}
        </h2>

        <div className="-mt-16">
          <CommonTable tableData={tableData} />
        </div>
      </div>
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default ViewEmiDetails;
