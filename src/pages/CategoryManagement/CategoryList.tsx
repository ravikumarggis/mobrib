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

import { useCategoryList, useDeleteCategory } from "../../queries/category-mangement";

interface InrWithdrawListRowData {
  id: string;

  categoryTitle: string;
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

const CategoryList = () => {
  const navigate = useNavigate();
  const { setParam, searchParams, removeParam } = useSetSearchParam();
  const [filter, setFilter] = useState({ page: searchParams.get("page") });
  const debouncedFilter = useDebounce(filter, 1000);
  const [isDownloadCsv, setIsDownloadCsv] = useState(false);
  const { data, isLoading ,refetch:refetchCategory} = useCategoryList();

 const {
    mutate: deleteCategory,
    isPending: deleteCategoryLoading,
    isSuccess: deleteCategorySuccess,
  } = useDeleteCategory();

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

  const handleDelete = (categoryTitle: string) => {
    if (!categoryTitle) return;
  
    deleteCategory({ categoryTitle });
  };
  
  useEffect(() => {
    if (isSuccess && WithdrawCryptoInrCSV?.result?.docs?.length > 0) {
      setIsDownloadCsv(false);
    }
  }, [isSuccess, WithdrawCryptoInrCSV]);

  useEffect(() => {
    if (deleteCategorySuccess) {
      refetchCategory();
    }
  }, [deleteCategorySuccess, refetchCategory]);
  

  const columns = [
    {
      header: "Sr. No",
      id: "serial",
      cell: ({ row, table }: { row: any; table: any }) => {
        return Pagination({ filter, table, row });
      },
    },
    columnHelper.accessor("categoryTitle", {
      header: "Category Title",
      cell: (info) => info.getValue() || "--",
    }),
    columnHelper.accessor("categoryIcon", {
      header: "Icon",
      cell: (info) => {
        const iconUrl = info.getValue();

        if (!iconUrl) return "--";

        return (
          <img
            src={iconUrl}
            alt="Category Icon"
            className="h-10 w-10 object-contain rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png";
            }}
          />
        );
      },
    }),

    // columnHelper.accessor("user.email", {
    //   header: "Email",
    //   cell: (info) => info.getValue() || "--",
    // }),

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
      id: "delete",
      cell: ({ row }: { row: any }) => {
        const categoryTitle = row.original.categoryTitle;
    
        return (
          <Button
          className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleDelete(categoryTitle)}
          >
          {deleteCategoryLoading ? "Deleting..." : "Delete"}
          </Button>
        );
      },
    }
    
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
    type: "CategoryList",
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
      <BackComponent text="Category List" />
      <CommonTable tableData={tableData} />
    </>
  );
};

export default CategoryList;
