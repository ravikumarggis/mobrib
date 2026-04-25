import moment from "moment";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Button from "../../components/ui/button/Button";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import CommonTable from "../../components/common/CommonTable";
import { useNavigate } from "react-router";
import {
  useWithdrawCrypto,
  useDepositList,
} from "../../queries/deposit-management";
import BackComponent from "../../components/backcomponent/BackComponent";
import {
  DateTimeFormates,
  OldNewUserTag,
  Pagination,
  statusColor,
  statusText,
  TestRealUserType,
} from "../../utils";
import { useSetSearchParam } from "../../hooks/useSetSearchParam";
import { useWithdrawCryptoInrCSV } from "../../queries/downloadCSV";
import CopyButton from "../../components/common/CopyButton";
import { useReportList } from "../../queries/report";

interface InrWithdrawListRowData {
    _id: string;
    reportedUser: {
      _id: string;
      name: string;
      email?: string;
      mobileNumber: string;
    }[];
    reportedBy: {
      _id: string;
      name: string;
      email?: string;
      mobileNumber: string;
    }[];
    reason: string;
    description: string;
    status: string;
    createdAt: string;
    task: {
      _id: string;
      categoryType: string;
      serviceFor: string;
      workDetails: string;
      amountOffering: number;
      status: string;
    };
  }

const columnHelper = createColumnHelper<InrWithdrawListRowData>();

const ReportList = () => {
  const navigate = useNavigate();
  const { setParam, searchParams, removeParam } = useSetSearchParam();
  const [filter, setFilter] = useState({ page: searchParams.get("page") });
  const debouncedFilter = useDebounce(filter, 1000);
  const [isDownloadCsv, setIsDownloadCsv] = useState(false);
  const { data, isLoading } = useReportList(debouncedFilter);

  console.log(data,"datadata");
  

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

  console.log(formateData,"formateDataformateData");
  

  useEffect(() => {
    if (isSuccess && WithdrawCryptoInrCSV?.result?.docs?.length > 0) {
      setIsDownloadCsv(false);
    }
  }, [isSuccess, WithdrawCryptoInrCSV]);

  const columns = [
    {
      header: "Sr. No",
      id: "serial",
      cell: ({ row, table }: any) => Pagination({ filter, table, row }),
    },
  
    // ✅ Reported By Name
    columnHelper.accessor((row) => row.reportedBy?.[0]?.name, {
      id: "reportedBy",
      header: "Reported By",
      cell: (info) => info.getValue() || "--",
    }),
  
    // ✅ Email
    columnHelper.accessor((row) => row.reportedBy?.[0]?.email, {
      id: "email",
      header: "Email",
      cell: (info) => {
        const val = info.getValue();
        return val ? (
          <span>
            {val} <CopyButton textToCopy={val} />
          </span>
        ) : (
          "--"
        );
      },
    }),
  
    // ✅ Reported User
    columnHelper.accessor((row) => row.reportedUser?.[0]?.name, {
      id: "reportedUser",
      header: "Reported User",
      cell: (info) => info.getValue() || "--",
    }),
  
    // ✅ Amount
    columnHelper.accessor((row) => row.task?.amountOffering, {
      id: "amount",
      header: "Amount",
      cell: (info) => info.getValue() || "--",
    }),
  
    // ✅ Status
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();
        return value ? (
          <span className={statusColor(value)}>
            {statusText(value)}
          </span>
        ) : (
          "--"
        );
      },
    }),
  
    // ✅ Date
    columnHelper.accessor("createdAt", {
      header: "Date & Time",
      cell: (info) => DateTimeFormates(info.getValue()),
    }),
  
    // ✅ Action
    {
      header: "Action",
      id: "view",
      cell: ({ row }: any) => (
        <Button
          onClick={() =>
            navigate(`/deposit-view`, {
              state: { withdrawDetail: row.original },
            })
          }
        >
          View
        </Button>
      ),
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
    type: "deposite",
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
      <BackComponent text="Report List" />
      <CommonTable tableData={tableData} />
    </>
  );
};

export default ReportList;
