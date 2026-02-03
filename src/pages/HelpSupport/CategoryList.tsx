import React, { useMemo, useState } from "react";
import Button from "../../components/ui/button/Button";
import CommonTable from "../../components/common/CommonTable";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { useHelpAsupportList } from "../../queries/helpandspport";
import { useDeleteCategory } from "../../queries/helpandspport";
import CreateCategoryModal from "../../components/modal/CreateCategoryModal";
import CreateSubCategoryModal from "../../components/modal/CreateSubCategoryModal";
import { useNavigate } from "react-router";
import ConfirmModal from "../../components/modal/confirmModal";
import BackComponent from "../../components/backcomponent/BackComponent";
import { DateTimeFormates } from "../../utils";
import { useDebounce } from "@uidotdev/usehooks";

type HelpSupportItem = {
  _id: number | string;
  image: string;
  category: string;
  description: string;
  createdDateTime: string;
};
interface Item {
  _id: string | number;
  image: string;
  categoryType: string;
  description: string;
  createdAt: string;
  languageType: string;
}

const CategoryList: React.FC = () => {


  const [filter, setFilter] = useState({ languageType: "English" });
  const debouncedFilter = useDebounce(filter, 1000);

  console.log(debouncedFilter, "debouncedFilter>>>>>>>>>>>>>>>>>>>>>>")


  const { data: listdata, isLoading } = useHelpAsupportList(debouncedFilter);

  const [isOpenCreateCategory, setisOpenCreateCategory] = useState(false);
  const [isOpenCreateSubCategory, setisOpenCreateSubCategory] = useState(false);
  const [showConfirmationModal, setshowConfirmationModal] = useState(false);
  const [selectCategoryID, setselectCategoryID] = useState("");


  console.log(selectCategoryID,"kkkkkk");
  

  // const { write } = useModulePermissions("Help And Support");
  const { mutate } = useDeleteCategory();
  const navigate = useNavigate();
  const formateData = useMemo(() => {
    const filtered = listdata?.data?.result?.map((item: Item) => ({
      id: item?._id,
      image: item?.image,
      category: item?.categoryType,
      description: item?.description,
      languageType: item?.languageType,
      createdDateTime: item?.createdAt,
    })) ?? [];
    return filtered;
  }, [listdata]);



  const columnHelper = createColumnHelper<HelpSupportItem>();
  const columns = [
    {
      header: "Sr. No",
      id: "serial",
      cell: ({ row }: { row: any }) => row.index + 1,
    },

    columnHelper.accessor("category", {
      header: "Reason",
      cell: (info) => info.getValue() || "--",
    }),

   

    columnHelper.accessor("createdDateTime", {
      header: "Created Date/Time",
      cell: (info) => DateTimeFormates(info.getValue())

    }),

    {
      header: "Action",
      cell: ({ row }: { row: any }) => (
        <div className="flex justify-start space-x-3 items-center">
          {/* <IoMdEye
            size={25}
            className="cursor-pointer"
            onClick={() => {
              navigate(`/view-subcategory/${row.original.id}`, {
                state: formateData,
              });
            }}
          />
          { row.original?.category !== "Sign Up and Login" && (
            <FaEdit
              size={20}
              className="cursor-pointer"
              onClick={() => {
                setselectCategoryID(row.original.id);
                setisOpenCreateCategory(true);
              }}
            />
          )} */}
          {row.original?.category !== "Sign Up and Login" && (
            <MdOutlineDeleteOutline
              size={25}
              className="cursor-pointer text-red-500"
              onClick={() => {
                setselectCategoryID(row.original.id);
                setshowConfirmationModal(true);
              }}
            />
          )}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: formateData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableData = {
    table,
    filter,
    setFilter,
    type: "HelpAndSupport",
    isLoading: isLoading,
    totalPage: formateData?.length !== 0 ? 1 : 0,
  };

  return (
    <>
      <div>
        <BackComponent text="Reason List" />
       
          <div className="w-full flex justify-center items-center sm:justify-end sm:space-x-8 space-x-4">
            <Button
              size="lg"
              children="Create Reason"
              onClick={() => setisOpenCreateCategory(true)}
            />
            {/* <Button
              size="lg"
              children="Create Sub Category"
              onClick={() => setisOpenCreateSubCategory(true)}
            /> */}
          </div>
       

        {/* <div className="w-full border border-gray-300/50 dark:border-gray-800 pt-2 pb-4 sm:pb-8 px-5 mt-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full items-end">
            <div className="w-full">
              <p className="text-gray-700 dark:text-gray-400 mb-0.5">Search</p>
              <div className="relative w-full">
                <button className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Search />
                </button>
                <input
                  type="text"
                  value={search}
                  placeholder="Search by Category name"
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full xl:pb-0.5">
              <div className="xl:w-[30%]">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setsearch("")}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div> */}

        <div>
          <CommonTable tableData={tableData} />
        </div>
      </div>
      {isOpenCreateCategory && (
        <CreateCategoryModal
          languageType={"English"}
          categoryID={selectCategoryID ? selectCategoryID : ""}
          text={selectCategoryID ? "Update Reason" : "Create Reason"}
          categoryData={selectCategoryID ? formateData : ""}
          isOpen={isOpenCreateCategory}
          onClose={() => {
            setisOpenCreateCategory(false);
            setselectCategoryID("");
          }}
          btnText={selectCategoryID ? "Update" : "Add"}
        />
      )}

      {
        isOpenCreateSubCategory && (
          <CreateSubCategoryModal
            text="Create Sub Category"
            buttontext="Add"
            categoryData={formateData}
            isOpen={isOpenCreateSubCategory}
            onClose={() => setisOpenCreateSubCategory(false)}
          />
        )
      }

      {
        showConfirmationModal && (
          <ConfirmModal
            message="Are you sure you want to delete this Category?"
            isOpen={showConfirmationModal}
            btnTextClose="Close"
            btnTextConfirm="Confirm"
            onClose={() => setshowConfirmationModal(false)}
            onConfirm={() => {
              mutate(selectCategoryID);
              setshowConfirmationModal(false);
            }}
          />
        )
      }
    </>
  );
};

export default CategoryList;
