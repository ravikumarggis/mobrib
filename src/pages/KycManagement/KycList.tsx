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
  useWithdrawList,
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
import { useUserList } from "../../queries/user-management";
import { useKycList } from "../../queries/kyc-management";

interface InrWithdrawListRowData {
  id: string;

  aadhaarNumber: string;
  panNumber: string;
  city: string;
  name: string;
  isTestUser: boolean;

  kycStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userType: string;
  Action: any;
}

const columnHelper = createColumnHelper<InrWithdrawListRowData>();

const KycList = () => {
  const navigate = useNavigate();
  const { setParam, searchParams, removeParam } = useSetSearchParam();
  const [filter, setFilter] = useState({ page: searchParams.get("page") });
  const debouncedFilter = useDebounce(filter, 1000);
  const [isDownloadCsv, setIsDownloadCsv] = useState(false);
  const { data, isLoading } = useKycList(debouncedFilter);

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
   
    columnHelper.accessor(
        (row) => row?.userId?.name,
        {
          id: "name",
          header: "Name",
          cell: (info) => info.getValue() || "--",
        }
      ),
    columnHelper.accessor(
        (row) => row?.userId?.mobileNumber,
        {
          id: "mobile",
          header: "Mobile No",
          cell: (info) => info.getValue() || "--",
        }
      ),
    columnHelper.accessor(
        (row) => row?.userId?.email,
        {
          id: "email",
          header: "Email",
          cell: (info) => info.getValue() || "--",
        }
      ),
      columnHelper.accessor("aadhaarNumber", {
        header: "Aadhaar Number",
        cell: (info) => info.getValue() || "--",
      }),
 
    // columnHelper.accessor("panNumber", {
    //   header: "Pan No.",
    //   cell: (info) => {
    //     const val = info.getValue() || "--";
    //     return val ? (
    //       <span>
    //         {" "}
    //         {val} <CopyButton textToCopy={val} />{" "}
    //       </span>
    //     ) : (
    //       "--"
    //     );
    //   },
    // }),

    // columnHelper.accessor("city", {
    //   header: "City",
    //   cell: (info) => info.getValue() || "--",
    // }),

    columnHelper.accessor("createdAt", {
      header: "Date & Time",
      cell: (info) => DateTimeFormates(info.getValue()),
    }),

    columnHelper.accessor("kycStatus", {
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
              navigate(`/kyc-view`, {
                state: { kycDetail: row?.original },
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
    type: "withdrawCrypto",
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
      <BackComponent text="KYC List" />
      <CommonTable tableData={tableData} />
    </>
  );
};

export default KycList;
