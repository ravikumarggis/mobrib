import moment from "moment";
import {
    createColumnHelper,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";
import CommonTable from "../../components/common/CommonTable";
import BackComponent from "../../components/backcomponent/BackComponent";

interface SupportContactUsRowData {
    name: string;
    email: string;
    mobileNumber: string;
    isNewUser: string;
    reasonType: string;
    termsCondition: string;
    reason: string;
    updatedAt: string;
}

import { DateTimeFormates, Pagination } from "../../utils";
import { useSetSearchParam } from "../../hooks/useSetSearchParam";
import { useSupportContactUs } from "../../queries/SupportContactUs";
import { IoMdEye } from "react-icons/io";
import ReasonDetailsModal from "../../components/modal/ReasonModal";
import { useSupportContactsCSV } from "../../queries/downloadCSV";
import CopyButton from "../../components/common/CopyButton";
const columnHelper = createColumnHelper<SupportContactUsRowData>();

const SupportContactUs = () => {
    const { setParam, searchParams, removeParam } = useSetSearchParam();
    const [filter, setFilter] = useState({ page: searchParams.get("page") });
    const debouncedFilter = useDebounce(filter, 1000);
    const { data, isLoading } = useSupportContactUs(debouncedFilter);
    const { data: SupportContactsCSV, isLoading: SupportContactsCSVLoading } = useSupportContactsCSV(debouncedFilter);

    console.log(SupportContactsCSV, "SupportContactsCSV>>>>>>>>>>>>>>>>>>>>>>>>>>")


    const [message, setMessage] = useState("");
    const [IsOpen, setIsOpen] = useState(false);

    const formateData = useMemo(() => {
        const tabledata = data?.result?.data ?? [];
        const pages = data?.result?.totalPages ?? 0;
        const downloadCSV = SupportContactsCSV?.result?.data?.map((item: any) => ({
            Name: item?.name || "--",
            Email: item?.email || "--",
            "User Tag": item?.isNewUser ? "New User" : "Old User",
            "Mobile Number": item?.mobileNumber || "--",
            "Reason Type": item?.reasonType || "--",
            "Descriptions": item?.reason || "--",
            "Date & Time": DateTimeFormates(item?.updatedAt)
        })) ?? []
        return { tabledata, pages, downloadCSV };
    }, [data, SupportContactsCSV]);

    const columns = [
        {
            header: "Sr. No",
            id: "serial",
            cell: ({ row, table }: { row: any; table: any }) => {
                return Pagination({ filter, table, row });
            },
        },

        columnHelper.accessor("name", {
            header: "Name",
            cell: (info) => info.getValue() || "--",
        }),

        // columnHelper.accessor("email", {
        //     header: "Email",
        //     cell: (info) => info.getValue() || "--",
        // }),
        columnHelper.accessor("email", {
            header: "Email",
            cell: (info) => {
                const val = info.getValue() || "--";
                return val ? (<span>   {val}   <CopyButton textToCopy={val} /> </span>) : ("--");
            },
        }),


        columnHelper.accessor("isNewUser", {
            header: "User Tag",
            cell: (info) => info.getValue() ? "New User" : !info.getValue() ? "Old User" : "--",
        }),

        columnHelper.accessor("mobileNumber", {
            header: "Mobile Number",
            cell: (info) => info.getValue() || "--",
        }),

        columnHelper.accessor("reasonType", {
            header: "Reason Type",
            cell: (info) => info.getValue() || "--",
        }),

        columnHelper.accessor("reason", {
            header: "Descriptions",
            cell: (info) => {
                return (
                    <IoMdEye
                        onClick={() => {
                            setMessage(info?.row?.original?.reason);
                            setIsOpen(true);
                        }}
                        size={25}
                        className="cursor-pointer"
                    />
                );
            },
        }),

        columnHelper.accessor("updatedAt", {
            header: "Date & Time",
            cell: (info) => DateTimeFormates(info.getValue())

        }),
    ];

    const table = useReactTable({
        data: formateData?.tabledata,
        columns: columns ?? [],
        getCoreRowModel: getCoreRowModel(),
    });

    const tableData = {
        filter,
        setFilter,
        isLoading,
        table,
        type: "SupportContactUs",
        totalPage: formateData?.pages,
        removeParamFn: () => removeParam("page"),
        setSearchParamsFn: (page: number) => setParam("page", page),
        filterData: {
            isCSVloading: SupportContactsCSVLoading,
            downloadCSV: formateData?.downloadCSV,
        },

    };

    return (
        <>
            <BackComponent text="Support Contact Us" />
            <CommonTable tableData={tableData} />
            <ReasonDetailsModal
                isOpen={IsOpen}
                reason={message}
                title="Descriptions"
                onClose={() => {
                    setIsOpen(false);
                    setMessage("");
                }}
            />
        </>
    );
};

export default SupportContactUs;
