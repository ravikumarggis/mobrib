import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../ui/button/Button";
import { useUpdateCategory, useUploadImage } from "../../queries/helpandspport";
import { useAddCategory } from "../../queries/helpandspport";
import toast from "react-hot-toast";
import Select from "../form/Select";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  categoryData: any;
  btnText: string;
  categoryID: number | string;
  languageType?: string
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  text,
  categoryData,
  btnText,
  categoryID,
}) => {
  if (!isOpen) return null;
  // const [ImgeFileName, setImgeFileName] = useState("");
  // const { data: UploadImageData, mutate: UploadImage } = useUploadImage();
  const { mutate: AdddataCategory } = useAddCategory(() => {
    onClose();
  });
  const { mutate: UpdatedataCategory } = useUpdateCategory(() => {
    onClose();
  });
  
  let UpdateCategoryData: any, fileName;
  if (categoryID) {
    UpdateCategoryData = categoryData?.find(
      (item: any) => item.id === categoryID
    );
    const url = UpdateCategoryData?.image;
    fileName = url?.split("/").pop();
  }


 

  const formik = useFormik({
    initialValues: {
      CategoryName: UpdateCategoryData ? UpdateCategoryData?.category : "",
      Description: UpdateCategoryData ? UpdateCategoryData?.description : "",
      languageType: UpdateCategoryData?.languageType ? UpdateCategoryData?.languageType : ""
    },
    enableReinitialize: categoryID ? true : false,
    validationSchema: Yup.object({
      CategoryName: Yup.string().required("Category is required."),
   

    }),
    onSubmit: (values) => {
      if (categoryID) {
        UpdatedataCategory({
          categoryId: UpdateCategoryData?.id,
          categoryType: values.CategoryName,
        
         
        });
      } else {
        AdddataCategory({
          categoryType: values.CategoryName,
        
         
        });
      }
    },
  });

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.currentTarget.files?.[0] || null;
  //   if (!file) {
  //     toast.error("Image is required.");
  //     return;
  //   }
  //   if (!allowedImageTypes.includes(file.type)) {
  //     toast.error("Only image files are allowed.");
  //     return;
  //   }
  //   if (file.size > 5 * 1024 * 1024) {
  //     toast.error("File must be less than 5MB.");
  //     return;
  //   }
  //   setImgeFileName(file?.name);
  //   UploadImage(file);
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/50 p-4">
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
          <Label htmlFor="CategoryName">Reason Name</Label>
          <Input
            type="text"
            id="CategoryName"
            name="CategoryName"
            value={formik.values.CategoryName}
            onChange={formik.handleChange}
            placeholder="Enter Category Name"
          />
          {/* {formik.touched.CategoryName && formik.errors.CategoryName && (
            <span className="text-red-500 text-xs">
              {formik.errors.CategoryName}
            </span>
          )} */}

          {formik.touched.CategoryName &&
            formik.errors.CategoryName &&
            typeof formik.errors.CategoryName === "string" && (
              <span className="text-red-500 text-xs">
                {formik.errors.CategoryName}
              </span>
            )}
        </div>

     

       
     
        
          <div className="flex justify-center mt-5">
            <Button
              children={`${btnText}`}
              className="w-[40%] sm:w-[30%]"
              onClick={() => formik.handleSubmit()}
            />
          </div>
    
      </div>
    </div>
  );
};

export default CreateCategoryModal;
