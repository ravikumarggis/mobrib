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
  statusColor,
  statusText,
} from "../../utils";
import { useSetSearchParam } from "../../hooks/useSetSearchParam";
import { useWithdrawCryptoInrCSV } from "../../queries/downloadCSV";

import { useNotificationList } from "../../queries/notification";
import { IoMdEye } from "react-icons/io";
import Button from "../../components/ui/button/Button";

interface InrWithdrawListRowData {
  id: string;

  heading: string;
  email: string;
  categoryIcon: string;
  isNewUser: boolean;
  isTestUser: boolean;

  mobileNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userType: string;
  Action: any;
}

const columnHelper = createColumnHelper<InrWithdrawListRowData>();

const NotificationList = () => {
  const navigate = useNavigate();
  const { setParam, searchParams, removeParam } = useSetSearchParam();
  const [filter, setFilter] = useState({ page: searchParams.get("page") });
  const debouncedFilter = useDebounce(filter, 1000);
  const [isDownloadCsv, setIsDownloadCsv] = useState(false);
  const { data, isLoading, refetch: refetchCategory } = useNotificationList();

  const {
    data: WithdrawCryptoInrCSV,
    isLoading: WithdrawCryptoInrCSVLoading,
    isSuccess,
  } = useWithdrawCryptoInrCSV(debouncedFilter, "Fiat", isDownloadCsv);

  const formateData = useMemo(() => {
    const tabledata = data ?? [];
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
    columnHelper.accessor("heading", {
      header: "Heading",
      cell: (info) => info.getValue() || "--",
    }),

    columnHelper.accessor("createdAt", {
      header: "Date & Time",
      cell: (info) => DateTimeFormates(info.getValue()),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        let value = info.getValue() || "--";
        return (
          <span className={`${statusColor(value)}`}>{statusText(value)}</span>
        );
      },
    }),

    {
      header: "Action",
      id: "view",
      cell: ({ row }: { row: any }) => {
        return (
          <Button
            onClick={() => {
              navigate(`/view-notification`, {
                state: { NotificationDetail: row?.original },
              });
            }}
          >
            View
          </Button>
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
    type: "NotificationList",
    totalPage: 1,
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
      <BackComponent text="Notification List" />
      <CommonTable tableData={tableData} />
    </>
  );
};

export default NotificationList;
