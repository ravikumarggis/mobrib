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

interface InrWithdrawListRowData {
  id: string;

  rating: any;
  rater: string;
  ratedUser: string;
  comment: any;

  createdAt: string;

  Action: any;
}

const columnHelper = createColumnHelper<InrWithdrawListRowData>();

const FeedBackList = () => {
  const navigate = useNavigate();
  const { setParam, searchParams, removeParam } = useSetSearchParam();
  const [filter, setFilter] = useState({ page: searchParams.get("page") });
  const debouncedFilter = useDebounce(filter, 1000);
  const [isDownloadCsv, setIsDownloadCsv] = useState(false);
  const { data, isLoading } = useFeedbackList(debouncedFilter);

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
        return Pagination({ filter, table, row });
      },
    },
    columnHelper.accessor("rating", {
      header: "Rate",
      cell: (info) => info.row.original.rating || "--",
    }),
    columnHelper.accessor("rater", {
      header: "Rater",
      cell: (info) => info.row.original.rater[0]?.name || "--",
    }),
    columnHelper.accessor("ratedUser", {
      header: "Rated User",
      cell: (info) => info.row.original.ratedUser[0]?.name || "--",
    }),

    columnHelper.accessor("comment", {
      header: "Comment",
      cell: (info) => {
        const comment = info.row.original.comment || "--";

        const truncated =
          comment.length > 30 ? comment.substring(0, 30) + "..." : comment;

        return (
          <div className="relative group cursor-pointer max-w-[200px]">
            <span>{truncated}</span>

            {comment.length > 30 && (
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-pre-wrap z-50 w-max max-w-xs">
                {comment}
              </div>
            )}
          </div>
        );
      },
    }),

    columnHelper.accessor("createdAt", {
      header: "Date & Time",
      cell: (info) => DateTimeFormates(info.getValue()),
    }),

    {
      header: "Action",
      id: "action",
      cell: ({ row }) => {
        const id = row.original._id;

        return (
          <div className="flex items-center gap-3">
            <IoMdEye
              size={22}
              className="cursor-pointer text-blue-500"
              onClick={() => {
                navigate(`/view-feedback`, {
                  state: { state: row?.original },
                });
              }}
            />

            <MdOutlineDeleteOutline
              size={22}
              className="cursor-pointer text-red-500"
              onClick={() => handleDelete(id)}
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
      <BackComponent text="Feedback List" />
      <CommonTable tableData={tableData} />
    </>
  );
};

export default FeedBackList;
