import React from "react";
import { IoClose } from "react-icons/io5";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../ui/button/Button";
import Select from "../form/Select";
import { useAddSubcategory } from "../../queries/helpandspport";
import { useUpdateSubCategory } from "../../queries/helpandspport";
interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryData?: any;
  UpdateSubcategoryData?: any;
  text?: string;
  buttontext?: string;
  UpdateSubCategoryID?: string;
}
const CreateSubCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  categoryData,
  text,
  buttontext,
  UpdateSubCategoryID,
  UpdateSubcategoryData,
}) => {
  if (!isOpen) return null;

  const { mutate } = useAddSubcategory(() => {
    onClose();
  });
  const { mutate: UpdateSubCategory } = useUpdateSubCategory(() => {
    onClose();
  });
  let options;
  if (UpdateSubCategoryID && UpdateSubcategoryData) {
    options = [
      {
        value: UpdateSubcategoryData?.id,
        label: UpdateSubcategoryData?.category,
      },
    ];
  } else {
    options = categoryData?.map((item: any) => {
      return {
        value: item?.id,
        label: item?.category,
      };
    });
  }

  const formik = useFormik({
    initialValues: {
      // category: UpdateSubcategoryData ? UpdateSubcategoryData?.id : "",
      category: UpdateSubcategoryData ? UpdateSubCategoryID : "",
      subcategory: UpdateSubcategoryData
        ? UpdateSubcategoryData?.subcategoryType
        : "",
    },
    enableReinitialize: UpdateSubcategoryData ? true : false,
    validationSchema: Yup.object({
      category: Yup.string().required("Category is required."),
      subcategory: Yup.string().required("Sub category is required."),
    }),
    onSubmit: (values) => {
      if (UpdateSubCategoryID) {
        UpdateSubCategory({
          id: Number(values?.category),
          subCategoryType: values?.subcategory,
        });
      } else {
        mutate({
          subCategoryType: values?.subcategory,
          categoryId: Number(values?.category),
        });
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/50 xl:pb-[150px] px-2">
      <div className="relative w-full max-w-2xl py-6 px-10 sm:px-20 bg-white rounded-lg dark:bg-gray-800 shadow-md">
        <button
          className="absolute top-2 right-2 text-xl font-bold text-black"
          onClick={onClose}
        >
          <IoClose className="text-gray-900 dark:text-white" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          {text}
        </h2>

        <div className="w-full">
          <Label> Category</Label>
          <Select
            options={options}
            value={formik.values.category}
            placeholder="Select Category"
            onChange={(e) => {
              formik.setFieldValue("category", e);
            }}
            className="dark:bg-dark-900"
          />
          {formik.touched.category && formik.errors.category && (
            <span className="text-red-500 text-xs">
              {formik.touched.category && formik.errors.category && (
                <span className="text-red-500 text-xs">
                  {formik.errors.category as string}
                </span>
              )}
            </span>
          )}
        </div>

        <div className="w-full mt-4">
          <Label htmlFor="subcategory">Sub Category Name</Label>
          <Input
            type="text"
            name="subcategory"
            id="subcategory"
            value={formik.values.subcategory}
            onChange={formik.handleChange}
            placeholder="Enter Sub Category Name"
          />
          {formik.touched.subcategory && formik.errors.subcategory && (
            <span className="text-red-500 text-xs">
              {formik.touched.subcategory && formik.errors.subcategory && (
                <span className="text-red-500 text-xs">
                  {formik.errors.subcategory as string}
                </span>
              )}
            </span>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            children={buttontext}
            className="w-[40%] sm:w-[30%]"
            onClick={() => formik.handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateSubCategoryModal;
