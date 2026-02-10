import React, { useEffect, useMemo, useState } from "react";
import { createColumnHelper, getCoreRowModel, useReactTable, } from "@tanstack/react-table";
import CommonTable from "../../components/common/CommonTable";
import { useTicketsList, useTicketsListCSV, useTicketStatus } from "../../queries/ticket";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import { useDebounce } from "@uidotdev/usehooks";
import "@smastrom/react-rating/style.css";
import { DateTimeFormates, OldNewUserTag, Pagination, statusText, TestRealUserType } from "../../utils";
import CopyButton from "../../components/common/CopyButton";
import { useSetSearchParam } from "../../hooks/useSetSearchParam";
import BackComponent from "../../components/backcomponent/BackComponent";
import ToggleSwitchButton from "../../components/form/ToggleSwitchButton";
import LoadingScreen from "../../components/common/LoadingScreen";
import { useHelpAsupportList } from "../../queries/helpandspport";

type User = {
  id: number;
  ticketId: number;
  email: string;
  name: string;
  categoryType: string;
  ticketStatus: string;
  isGuestUser: boolean;
  createdAt: string;
  starRate: string;
  Action?: any;
  user: {
    user_id: string;
    isNewUser: boolean;
    isTestUser: boolean;
  };
};
const columnHelper = createColumnHelper<User>();
const Ticket: React.FC = () => {
  const navigate = useNavigate();
  const [isDownloadCsv, setIsDownloadCsv] = useState(false)
  const { mutate, isSuccess, isPending: TicketStatusPending } = useTicketStatus();
  const { setParam, searchParams, removeParam } = useSetSearchParam();
  const [filter, setFilter] = useState({ page: searchParams.get("page"), languageType: "English" });
  const debouncedFilter = useDebounce(filter, 1000);
  const { data: ticketList, isPending, refetch } = useTicketsList(debouncedFilter);
  const { data: CsvData, isLoading: downloadCSVLoade, isSuccess: TicketsListCSVSucces } = useTicketsListCSV(debouncedFilter, isDownloadCsv);

  const { data: CategoryList } = useHelpAsupportList(debouncedFilter);
  
  useEffect(() => {
    if (isSuccess) {
      refetch()
    }

  }, [isSuccess])

  const formateData = useMemo(() => {
    const tableData = ticketList?.data?.result?.docs ?? [];
    const totalPage = ticketList?.data?.result?.pages ?? 0;
    const Subject = CategoryList?.data?.result?.map((item: any, index: number) => ({ id: index + 1, name: item?.categoryType })) ?? [];
  
    return { tableData, totalPage, Subject }

  }, [ticketList, CsvData, CategoryList]);

  

  const columns = [
    {
      header: "Sr. No",
      id: "serial",
      cell: ({ row, table }: { row: any; table: any }) => {
        return Pagination({ filter, table, row });
      },
    },


    columnHelper.accessor("user.name", {
      header: "Name",
      cell: (info) => info.getValue() || "--",
    }),

    columnHelper.accessor("user.email", {
      header: "Email",
      cell: (info) => {
        const val = info.getValue() || "--";
        const isGuestUser = info?.row?.original?.isGuestUser;
        return !isGuestUser ? (
          <span>
            {val}
            <CopyButton textToCopy={val} />
          </span>
        ) : (
          "--"
        );
      },
    }),

    columnHelper.accessor("user.mobileNumber", {
      header: "Mobile Number",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("reason", {
      header: "Reason",
      cell: (info) => info.getValue()
    }),

    columnHelper.accessor("ticketStatus", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();
        const status =
          value === "pending"
            ? "Pending"
            : value === "in-process"
              ? "In-Process"
              : value === "resolved"
                ? "Resolved"
                : "--";
        let color = "";
        if (value === "resolved") color = "text-green-500";
        else if (value === "pending") color = "text-yellow-500";
        else if (value === "in-process") color = "text-yellow-700";
        return <span className={`${color}`}>{status}</span>;
      },
    }),


 

    columnHelper.accessor("createdAt", {
      header: "Date & Time",
      cell: (info) => DateTimeFormates(info.getValue())

    }),

    columnHelper.accessor("Action", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <Button
            onClick={() => navigate(`/tickets-details/${row.original._id}`)}
          >
            View
          </Button>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: formateData?.tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableData = {
    filter,
    setFilter,
    table,
    isLoading: isPending,
    type: "ticket",
    totalPage: formateData?.totalPage,
    removeParamFn: () => removeParam("page"),
    setSearchParamsFn: (page: number) => setParam("page", page),
    filterData: {
      isCSVloading: downloadCSVLoade,
      Subject: formateData?.Subject,
      // downloadCSV: formateData?.downloadCSVData,
      setIsDownloadCsv: setIsDownloadCsv,
      isSuccess: TicketsListCSVSucces,
      isDownloadCsv: isDownloadCsv

    },
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full mb-5">
          <BackComponent text="Ticket List" />
        </div>
        <div className="w-full">
          {/* <div className="w-full grid grid-cols-1 md:grid-cols-3  gap-x-5 gap-y-4">
            <div className="border rounded-lg flex flex-col justify-center items-center font-semibold border-gray-300  dark:border-gray-700 py-2 dark:text-gray-100">
              <h3>Pending Requests</h3>
              <p>{ticketList?.data?.result?.totalPendingCount}</p>
            </div>
            <div className="border rounded-lg flex flex-col justify-center items-center font-semibold border-gray-300  dark:border-gray-700 py-2 dark:text-gray-100">
              <h3>In-process Requests</h3>
              <p>{ticketList?.data?.result?.totalInprocessCount}</p>
            </div>
            <div className="border rounded-lg flex flex-col justify-center items-center font-semibold border-gray-300  dark:border-gray-700 py-2 dark:text-gray-100">
              <h3>Resolved Requests</h3>
              <p>{ticketList?.data?.result?.totalResolvedCount}</p>
            </div>
          </div> */}

          <CommonTable tableData={tableData} />

          {TicketStatusPending && <LoadingScreen />}
        </div>
      </div>
    </>
  );
};

export default Ticket;
