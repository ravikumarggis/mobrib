import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import NeonSpinner from "../../components/common/NeonSpinner";
import BackComponent from "../../components/backcomponent/BackComponent";

import { api } from "../../services/apiServices";

/* =========================
   API CALLS
========================= */

// Upload image to Cloudinary
const uploadImage = (formData: FormData) => {
  return api({
    url: "/user/uploadImage",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Add category (image URL only)
const addCategory = (data: {
  categoryTitle: string;
  categoryIcon: string;
}) => {
  return api({
    url: "/admin/addCategory",
    method: "POST",
    data,
  });
};

/* =========================
   COMPONENT
========================= */
export default function AddCategory() {
  const navigate = useNavigate();

  /* =========================
     IMAGE UPLOAD MUTATION
  ========================= */
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (res) => {
      const imageUrl = res?.data?.result;

      if (imageUrl) {
        formik.setFieldValue("icon", imageUrl);
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Invalid image response");
      }
    },
    onError: () => {
      toast.error("Image upload failed");
    },
  });

  /* =========================
     ADD CATEGORY MUTATION
  ========================= */
  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: (res) => {
      if (res?.data?.responseCode === 200) {
        toast.success(res.data.responseMessage);
        navigate("/category-list");
      } else {
        toast.error(res?.data?.responseMessage);
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.responseMessage || "Failed to add category"
      );
    },
  });

 
  const formik = useFormik({
    initialValues: {
      title: "",
      icon: "", 
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Category title is required"),
      icon: Yup.string().required("Category icon is required"),
    }),
    onSubmit: (values) => {
      addCategoryMutation.mutate({
        categoryTitle: values.title,
        categoryIcon: values.icon,
      });
    },
  });

  return (
    <div className="h-full">
      <BackComponent text="Add Category" />

      <div className="flex h-full">
        <div className="flex flex-col justify-center flex-1 w-full mt-[10%] max-w-md mx-auto">
          <form onSubmit={formik.handleSubmit} className="space-y-6">

            {/* =========================
                CATEGORY TITLE
            ========================= */}
            <div>
              <Label>
                Category Title <span className="text-error-500">*</span>
              </Label>
              <Input
                name="title"
                placeholder="Enter category title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && formik.errors.title}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-sm text-error-500 mt-1">
                  {formik.errors.title}
                </p>
              )}
            </div>

            {/* =========================
                CATEGORY ICON
            ========================= */}
            <div>
              <Label>
                Category Icon <span className="text-error-500">*</span>
              </Label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (!file) return;

                  // Validate file manually
                  if (!file.type.startsWith("image/")) {
                    toast.error("Only image files are allowed");
                    return;
                  }

                  if (file.size > 1024 * 1024) {
                    toast.error("Image must be less than 1MB");
                    return;
                  }

                  const formData = new FormData();
                  formData.append("file", file);

                  uploadImageMutation.mutate(formData);
                }}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary-500 file:text-white
                  hover:file:bg-primary-600"
              />

              {formik.touched.icon && formik.errors.icon && (
                <p className="text-sm text-error-500 mt-1">
                  {formik.errors.icon}
                </p>
              )}

              {/* IMAGE PREVIEW */}
              {formik.values.icon && (
                <img
                  src={formik.values.icon}
                  alt="Preview"
                  className="mt-3 h-20 w-20 object-cover rounded-md border"
                />
              )}
            </div>

            {/* =========================
                SUBMIT BUTTON
            ========================= */}
            <Button
              type="submit"
              className="w-full"
              size="sm"
              disabled={
                uploadImageMutation.isPending ||
                addCategoryMutation.isPending
              }
              startIcon={
                (uploadImageMutation.isPending ||
                  addCategoryMutation.isPending) && <NeonSpinner size="6" />
              }
            >
              Add Category
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
