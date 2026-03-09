import React, { useMemo } from "react";
import CommonTable from "../../components/common/CommonTable";
import { IoMdEye } from "react-icons/io";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useNavigate } from "react-router";
import BackComponent from "../../components/backcomponent/BackComponent";
import { useStaticContentList } from "../../queries/static-content";
import { FaEdit } from "react-icons/fa";
type ContentRow = {
  id: string | undefined;
  title: string;
  type: string;
};
const ContentMangement: React.FC = () => {

  const navigate = useNavigate();
  const { data: StaticContentList } = useStaticContentList();
  const columnHelper = createColumnHelper<ContentRow>();
  const formteData = useMemo(() => {
    return (
      StaticContentList?.data?.result?.map((item: any) => ({
        id: item?.id,
        title: item?.title,
        type: item?.type,
      })) ?? []
    );
  }, [StaticContentList]);
  const columns = [
    {
      header: "Sr. No",
      id: "serial",
      cell: ({ row }: { row: any }) => row.index + 1,
    },
    columnHelper.accessor("type", {
      header: "Type",
      cell: (info) => info.getValue() || "--",
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue() || "--",
    }),
    {
      header: "Action",
      cell: ({ row }: { row: any }) => {
        const { _id, type } = row.original;
    
        return (
          <div className="flex justify-start space-x-2 sm:space-x-6 items-center">
            <IoMdEye
              size={25}
              className="cursor-pointer"
              onClick={() => navigate(`/view-static-content/${type}`)}
            />
    
            <FaEdit
              size={20}
              className="cursor-pointer"
              onClick={() => navigate(`/edit-static-content/${_id}/${type}`)}
            />
          </div>
        );
      },
    }
  ];

  const table = useReactTable({
    data: formteData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableData = {
    table,
    type: "",
    totalPage: 1,
  };

  return (
    <div>
      <BackComponent text="Static Content Management" />
      <div>
        <CommonTable tableData={tableData} />
      </div>
    </div>
  );
};

export default ContentMangement;
