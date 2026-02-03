import React, { useEffect, useMemo, useState } from "react";
import BackComponent from "../../components/backcomponent/BackComponent";
import { Search } from "lucide-react";
import Button from "../../components/ui/button/Button";
import { IoMdEye } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CommonTable from "../../components/common/CommonTable";
import { useLocation, useParams } from "react-router";
import { useSubCategoryList } from "../../queries/helpandspport";
import { useeDeleteSubCategory } from "../../queries/helpandspport";
import { useNavigate } from "react-router";
import ConfirmModal from "../../components/modal/confirmModal";
import DataNotFound from "../../components/common/DataNotFound";
import CreateSubCategoryModal from "../../components/modal/CreateSubCategoryModal";
import useModulePermissions from "../../queries/subAdmin";
type SubCategoryItem = {
  id: number | string;
  Subcategory: string;
};

const SubCategoryList: React.FC = () => {
  const [showconfirmationModal, setshowconfirmationModal] = useState(false);
  const [DeleteSubcategoryID, setDeleteSubcategoryID] = useState("");
  const [isOpenUpdateSubCategory, setIsOpenUpdateSubCategory] = useState(false);
  const [UpdateSubCategoryID, setUpdateSubCategoryID] = useState("");
  const [searchSubCategory, setsearchSubCategory] = useState("");
  const location = useLocation();
  const categoryData = location.state;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const parsedId = id ? Number(id) : undefined;
  const { data: SubcategoryListdata, isLoading } = useSubCategoryList(parsedId);
  const { mutate } = useeDeleteSubCategory();
  const { write } = useModulePermissions("Help And Support");

  const formateData = useMemo(() => {
    return (
      SubcategoryListdata?.data?.result?.map((item: any) => ({
        id: item?.id,
        Subcategory: item?.subCategoryType,
      })) ?? []
    );
  }, [SubcategoryListdata]);


  const filterData = useMemo(() => {
    if (!searchSubCategory) {
      return formateData;
    }
    const lowerSearch = searchSubCategory.toLocaleLowerCase();
    return formateData?.filter((item: any) =>
      item.Subcategory?.toLowerCase().includes(lowerSearch)
    );
  }, [formateData, searchSubCategory]);

  const UpdateCagteoryData = categoryData?.find(
    (item: any) => Number(item.id) === Number(id)
  );


  const SucategorDescriptionyData = formateData?.find(
    (item: any) => item?.id === UpdateSubCategoryID
  );
  const finalUpdateSubCategoryData = {
    ...UpdateCagteoryData,
    subcategoryType: SucategorDescriptionyData?.Subcategory,
  };

  const columnHelper = createColumnHelper<SubCategoryItem>();
  const columns = [
    {
      header: "Sr. No",
      id: "serial",
      cell: ({ row }: { row: any }) => row.index + 1,
    },
    columnHelper.accessor("Subcategory", {
      header: " Sub Category",
      cell: (info) => info.getValue() || "--",
    }),

    {
      header: "Action",
      cell: ({ row }: { row: any }) => (
        <div className="flex justify-start space-x-2 sm:space-x-6 items-center">
          <IoMdEye
            size={25}
            className="cursor-pointer"
            onClick={() => {
              navigate(`/view-QuestionAnswer/${row.original.id}`, {
                state: id,
              });
            }}
          />
          {write && (
            <FaEdit
              size={20}
              className="cursor-pointer"
              onClick={() => {
                setIsOpenUpdateSubCategory(true);
                setUpdateSubCategoryID(row.original.id);
              }}
            />
          )}
          {write && (
            <MdOutlineDeleteOutline
              size={25}
              className="cursor-pointer text-red-500"
              onClick={() => {
                setshowconfirmationModal(true),
                  setDeleteSubcategoryID(row.original.id);
              }}
            />
          )}
          {write && (
            <p
              className="text-[#1EA4E2] font-bold cursor-pointer"
              onClick={() =>
                navigate(`/Add-QuestionAnswer/${row.original.id}`, {
                  state: id,
                })
              }
            >
              Add Q/A
            </p>
          )}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filterData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableData = {
    table,
    type: "",
    isLoading: isLoading,
    totalPage: filterData?.length == 0 ? 0 : 1,
  };

  return (
    <>
      <div>
        <div>
          <BackComponent text="View Sub Category" />
        </div>
        {SubcategoryListdata?.data ? (
          <div>
            <div className="flex gap-10 items-end border  border-gray-300  dark:border-gray-700 px-4 pt-2 pb-6 rounded-lg shadow-sm mt-12">
              <div>
                <p className="text-gray-700 dark:text-gray-400 mb-0.5">
                  Search
                </p>
                <div className="relative w-full">
                  <button className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Search />
                  </button>
                  <input
                    type="text"
                    value={searchSubCategory}
                    onChange={(e) => setsearchSubCategory(e.target.value)}
                    placeholder="Search by Sub Category"
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setsearchSubCategory("")}
                >
                  Reset
                </Button>
              </div>
            </div>
            <div>
              <CommonTable tableData={tableData} />
            </div>
          </div>
        ) : (
          <div className="border mt-5 rounded-lg  border-gray-300  dark:border-gray-700">
            <DataNotFound />
          </div>
        )}
      </div>

      {DeleteSubcategoryID && showconfirmationModal && (
        <ConfirmModal
          message="Are you sure you want to delete this sub category"
          isOpen={showconfirmationModal}
          btnTextClose="Close"
          btnTextConfirm="Confirm"
          onConfirm={() => {
            mutate(Number(DeleteSubcategoryID));
            setDeleteSubcategoryID("");
          }}
          onClose={() => {
            setDeleteSubcategoryID("");
            setshowconfirmationModal(false);
          }}
        />
      )}

      {isOpenUpdateSubCategory && (
        <CreateSubCategoryModal
          onClose={() => {
            setIsOpenUpdateSubCategory(false);
          }}
          UpdateSubCategoryID={UpdateSubCategoryID}
          UpdateSubcategoryData={finalUpdateSubCategoryData}
          isOpen={isOpenUpdateSubCategory}
          text={
            UpdateSubCategoryID ? "Upadate Sub Category" : "Create Sub Category"
          }
          buttontext={UpdateSubCategoryID ? "Update" : "Add"}
        />
      )}
    </>
  );
};

export default SubCategoryList;
