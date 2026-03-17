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
import { DateTimeFormates, Pagination, statusText } from "../../utils";
import { useSetSearchParam } from "../../hooks/useSetSearchParam";
import { useWithdrawCryptoInrCSV } from "../../queries/downloadCSV";

import { IoMdEye } from "react-icons/io";
import { useDeleteFeedback, useFeedbackList } from "../../queries/feedback";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDisputeList } from "../../queries/dispute";

interface InrWithdrawListRowData {
  id: string;

  rating: any;
  poster: string;
  ratedUser: string;
  requestedResolution: any;

  disputeStatus: string;
  createdAt: string;

  Action: any;
}

const columnHelper = createColumnHelper<InrWithdrawListRowData>();

const DisputeList = () => {
  const navigate = useNavigate();
  const { setParam, searchParams, removeParam } = useSetSearchParam();
  const [filter, setFilter] = useState({ page: searchParams.get("page") });
  const debouncedFilter = useDebounce(filter, 1000);
  const [isDownloadCsv, setIsDownloadCsv] = useState(false);
  const { data, isLoading } = useDisputeList(debouncedFilter);

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

  const {
    mutate: deleteFeedback,
    isPending: deleteFeedbackLoading,
    isSuccess: deleteFeedbackSuccess,
  } = useDeleteFeedback();

  const handleDelete = (_id: string) => {
    if (!_id) return;

    deleteFeedback({ _id });
  };

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
        return Pagination?.({ filter, table, row });
      },
    },

   
    columnHelper.accessor("poster", {
      header: "Poster Name",
      cell: (info) => info?.row?.original?.poster?.name ?? "--",
    }),
    columnHelper.accessor("tasker", {
      header: "Tasker Name",
      cell: (info) => info?.row?.original?.tasker?.name ?? "--",
    }),

    columnHelper.accessor("disputeStatus", {
      header: "Dispute Status",
      cell: (info) => info?.row?.original?.disputeStatus ?? "--",
    }),
 columnHelper.accessor("requestedResolution", {
      header: "Requested Resolution",
      cell: (info) => info?.row?.original?.requestedResolution ?? "--",
    }),

  
    columnHelper.accessor("createdAt", {
      header: "Date & Time",
      cell: (info) => DateTimeFormates?.(info?.getValue?.()),
    }),

    {
      header: "Action",
      id: "action",
      cell: ({ row }) => {
        const id = row?.original?._id;

        return (
          <div className="flex items-center gap-3">
            <IoMdEye
              size={22}
              className="cursor-pointer text-blue-500"
              onClick={() => {
                navigate?.(`/view-dispute`, {
                  state: { state: row?.original },
                });
              }}
            />

            <MdOutlineDeleteOutline
              size={22}
              className="cursor-pointer text-red-500"
              onClick={() => handleDelete?.(id)}
            />
          </div>
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
    type: "feedbackList",
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
      <BackComponent text="Dispute List" />
      <CommonTable tableData={tableData} />
    </>
  );
};

export default DisputeList;
