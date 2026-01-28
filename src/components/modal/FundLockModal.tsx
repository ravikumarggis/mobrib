import React, { useMemo } from "react";
import CommonTable from "../common/CommonTable";
import { createColumnHelper, getCoreRowModel, useReactTable, } from "@tanstack/react-table";
import moment from "moment";
import LoadingScreen from "../common/LoadingScreen";
import { statusColor, statusText } from "../../utils";

type Props = {
    isOpen: boolean;
    onClose?: () => void;
    title?: string;
    selecteddata: any;
};
interface EmaiTableRowData {
    status: string;
    date: string;
    releaseAmount: string;
    percentage: string;
}
const columnHelper = createColumnHelper<EmaiTableRowData>();
const FundLockModal: React.FC<Props> = ({
    isOpen,
    onClose,
    title = "Details",
    selecteddata,
}) => {


    if (!isOpen) return null;
    const planDetails = useMemo(() => selecteddata ?? [], [selecteddata]);


    const columns = [

        {
            header: "Sr. No",
            id: "serial",
            cell: ({ row }: { row: any }) => row.index + 1,
        },

        columnHelper.accessor("releaseAmount", {
            header: "Release Amount",
            cell: (info) => info.getValue() || "--",
        }),


        columnHelper.accessor("percentage", {
            header: "Percentage",
            cell: (info) => info.getValue() || "--",
        }),


        columnHelper.accessor("status", {
            header: "Status",
            cell: (info) => info.getValue() ? <span className={`${statusColor(info.getValue())}`}>{statusText(info.getValue())}</span> : "--",
        }),


        columnHelper.accessor("date", {
            header: "Releasing Date & Time",
            cell: (info) => info.getValue() ? moment(info.getValue())?.format("lll") : "--",
        }),

    ];

    const table = useReactTable({
        data: planDetails,
        columns: columns ?? [],
        getCoreRowModel: getCoreRowModel(),
    });

    const tableData = {
        table,
        type: "",
        totalPage: "no",
    };

    return (
        <div className="inset-0 flex h-screen items-center justify-center bg-opacity-50 backdrop-blur-xs absolute bg-black/10 z-50">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-[95%] xl:max-w-[50%] px-1 py-4 sm:p-8 relative max-h-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-xl font-bold text-black dark:text-white"
                >
                    ✕
                </button>

                <h2 className="text-center text-base md:text-lg font-semibold mb-0 dark:text-white text-gray-900">
                    {title}
                </h2>

                <div className="-mt-8">
                    <CommonTable tableData={tableData} />
                </div>
            </div>
            {false && <LoadingScreen />}
        </div>
    );
};

export default FundLockModal;




