import moment from "moment";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import CommonTable from "../../components/common/CommonTable";
import { useNavigate } from "react-router";
import BackComponent from "../../components/backcomponent/BackComponent";
import {
  DateTimeFormates,
  Pagination,
  statusText,

} from "../../utils";
import { useSetSearchParam } from "../../hooks/useSetSearchParam";
import { useWithdrawCryptoInrCSV } from "../../queries/downloadCSV";

import { IoMdEye } from "react-icons/io";
import { useTaskList } from "../../queries/tickets";

interface InrWithdrawListRowData {
  id: string;
  
  userId: any;
  platformFee: string;
  taskLocation: string;
  location: any;
   
  paymentStatus: string;
  taskProgress: string;
  createdAt: string;
  
  Action: any;
}

const columnHelper = createColumnHelper<InrWithdrawListRowData>();

const Task = () => {
  const navigate = useNavigate();
  const { setParam, searchParams, removeParam } = useSetSearchParam();
  const [filter, setFilter] = useState({ page: searchParams.get("page") });
  const debouncedFilter = useDebounce(filter, 1000);
  const [isDownloadCsv, setIsDownloadCsv] = useState(false);
  const { data, isLoading } = useTaskList(debouncedFilter);


  

  const {
    data: WithdrawCryptoInrCSV,
    isLoading: WithdrawCryptoInrCSVLoading,
    isSuccess,
  } = useWithdrawCryptoInrCSV(debouncedFilter, "Fiat", isDownloadCsv);

  const formateData = useMemo(() => {
    const tabledata = data?.docs ?? [];
    const pages = data?.totalPages ?? 0;
    const WithCryptoInrCSVData =
      WithdrawCryptoInrCSV?.result?.docs?.map((item: any) => ({
        Name: item?.user?.name,
        Email: item?.user?.email,

        Status: statusText(item?.withdrawStatus),
      })) ?? [];
    return { tabledata, pages, WithCryptoInrCSVData };
  }, [data, WithdrawCryptoInrCSV]);

  useEffect(() => {
    if (isSuccess && WithdrawCryptoInrCSV?.result?.docs?.length > 0) {
      setIsDownloadCsv(false);
    }
  }, [isSuccess, WithdrawCryptoInrCSV]);

  const columns = [
    {
      header: "Sr. No",
      id: "serial",
      cell: ({ row, table }: { row: any; table: any }) => {
        return Pagination({ filter, table, row });
      },
    },
    columnHelper.accessor("userId", {
      header: "Name",
      cell: (info) => info.row.original.userId?.name || "--",
    }),
    columnHelper.accessor("userId", {
      header: "Email",
      cell: (info) => info.row.original.userId?.email || "--",
    }),
    columnHelper.accessor("platformFee", {
      header: "Platform Fee",
      cell: (info) => info.getValue() || "0",
    }),


 
    columnHelper.accessor("paymentStatus", {
      header: "Payment Status",
      cell: (info) => info.getValue() || "--",
    }),
    columnHelper.accessor("taskProgress", {
      header: "Task Status",
      cell: (info) => info.getValue() || "--",
    }),
    columnHelper.accessor("location", {
      header: "Location",
      cell: (info) => {
        const location = info.getValue();
    
        if (!location?.coordinates?.length) return "--";
    
        const [lng, lat] = location.coordinates;
    
        return (
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            📍 Map
          </a>
        );
      },
    }),
    
    columnHelper.accessor("createdAt", {
      header: "Date & Time",
      cell: (info) => DateTimeFormates(info.getValue()),
    }),

    {
      header: "Action",
      id: "view",
      cell: ({ row }: { row: any }) => {
        return (
          // <Button
          //   onClick={() => {
          //     navigate(`/view-user`, {
          //       state: { userDetail: row?.original                },
          //     });
          //   }}
          // >
          //   View
          // </Button>
            <IoMdEye
                      size={25}
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(`/view-task`, {
                          state: { id: row?.original                },
                        });
                      }}
                    />
        );
      },
    },
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
    type: "userList",
    totalPage: formateData?.pages,
    filterData: {
      WithCryptoInrCSVData: formateData?.WithCryptoInrCSVData,
      isCSVloading: WithdrawCryptoInrCSVLoading,
      setIsDownloadCsv: setIsDownloadCsv,
      isSuccess: isSuccess,
      isDownloadCsv: isDownloadCsv,
    },
    removeParamFn: () => removeParam("page"),
    setSearchParamsFn: (page: number) => setParam("page", page),
  };

  return (
    <>
      <BackComponent text="Task List" />
      <CommonTable tableData={tableData} />
    </>
  );
};

export default Task;
