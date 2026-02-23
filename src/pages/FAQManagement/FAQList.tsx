import moment from "moment";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import CommonTable from "../../components/common/CommonTable";
import { useNavigate } from "react-router";
import BackComponent from "../../components/backcomponent/BackComponent";
import { useFAQList } from "../../queries/FAQManagement";
import { FaEdit } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { DateTimeFormates, FormateText } from "../../utils";

interface UserSubscriptionList {
  id: number;
  question: string;
  updatedAt: string;
  action: any;
}

const columnHelper = createColumnHelper<UserSubscriptionList>();

const FAQList: React.FC = () => {
  const navigate = useNavigate();
  const { data: FAQList, isPending } = useFAQList();
  const formateData = useMemo(() => FAQList?.result ?? [], [FAQList]);

  const columns = [
    {
      header: "Sr. No",
      id: "serial",
      cell: ({ row }: { row: any }) => {
        return row.index + 1;
      },
    },

    columnHelper.accessor("question", {
      header: "Question",
      cell: (info) => {
        const value = info.getValue();
        if (!value) return "--";
    
        const truncated =
          value.length > 20 ? value.substring(0, 20) + "..." : value;
    
        return FormateText(truncated);
      },
    }),

    columnHelper.accessor("updatedAt", {
      header: "Date & Time",
      cell: (info) => DateTimeFormates(info.getValue())


    }),

    columnHelper.accessor("action", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex justify-start space-x-4 items-center">
            <IoMdEye
              size={25}
              className="cursor-pointer"
              onClick={() =>
                navigate("/add-update-faq", {
                  state: { selectedData: row?.original, type: "viewFAQ" },
                })
              }
            />

           
                <FaEdit
                  onClick={() =>
                    navigate("/add-update-faq", {
                      state: { selectedData: row?.original, type: "editFAQ" },
                    })
                  }
                  size={20}
                  className="cursor-pointer"
                />
            
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: formateData ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableData = {
    type: "",
    isLoading: isPending,
    table,
    totalPage: formateData?.length !== 0 ? 1 : 0,
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-between items-center">
          <div className="w-full">
            <BackComponent text="FAQ's" />
          </div>
       
            <div className="w-full flex justify-end">
              <button
                className="bg-[#3641F5] text-white max-w-[140px] py-1.5 w-full rounded-lg text-sm sm:text-base font-semibold"
                onClick={() => navigate("/add-update-faq")}
              >
                Add FAQ
              </button>
            </div>
      
        </div>
        <CommonTable tableData={tableData} />
      </div>
    </>
  );
};

export default FAQList;
