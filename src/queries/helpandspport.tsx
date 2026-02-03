import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/apiServices";
import toast from "react-hot-toast";

interface UpdateCategoryPayload {
  categoryId: number;
  categoryType: string;

  image?: string;
 
}

interface CategoryPayload {
  categoryType: string;
  
  image?: string;
  
}

interface AddSubCategoryPayload {
  categoryId: number;
  subCategoryType: string;
}

interface UpdateSubCategoryPayload {
  id: number;
  subCategoryType: string;
}

interface AddQAPayload {
  subCategoryId: number;
  questionData: { question: string; answer: string }[];
}

/***************************  Category list*********************************/

export const handlehelpandsupport = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/listTicketCategory",
      method: "GET",
      params: {
        languageType: filter?.languageType || undefined
      }
    });
    if (response?.data?.responseCode === 200) {
      return response;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useHelpAsupportList = (filter: any) => {
  return useQuery({
    queryKey: ["helpandsupport", filter],
    queryFn: () => handlehelpandsupport(filter),
  });
};

/************************************** Upload Iamge ***************************/
const handleUploadImage = async (
  file: File | null,
  type: string | undefined
) => {
  try {
    if (!file) {
      toast.error("File is required");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const response = await api({
      url: "/user/uploadImageFile",
      method: "POST",
      data: formData,
    });
    if (response?.data?.responseCode === 200) {
      if (type === "Banner") {
        toast.success("Banner Uploaded successfully.");
      } else {
        toast.success(response?.data?.responseMessage);
      }

      return response;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useUploadImage = (type?: string | undefined) => {
  return useMutation({
    mutationFn: (file: File | null) => handleUploadImage(file, type),
  });
};

/****************************************************** Add category ********************/
const handleAddCategory = async (data: CategoryPayload) => {
  try {
    const response = await api({
      url: "/admin/addTicketCategory",
      method: "POST",
      data: data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useAddCategory = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryPayload) => handleAddCategory(data),
    onSuccess: (data) => {
      if (data?.data?.responseCode === 200) {
        if (onSuccessCallback) {
          onSuccessCallback();
          queryClient.invalidateQueries({ queryKey: ["helpandsupport"] });
        }
      }
    },
  });
};

/****************************Update Category *********************************/
const handleUpadteCategory = async (data: UpdateCategoryPayload) => {
  try {
    const response = await api({
      url: "/admin/editCategory",
      method: "PUT",
      data: data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useUpdateCategory = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCategoryPayload) => handleUpadteCategory(data),
    onSuccess: (data) => {
      if (data?.data?.responseCode === 200) {
        if (onSuccessCallback) {
          onSuccessCallback();
          queryClient.invalidateQueries({ queryKey: ["helpandsupport"] });
        }
      }
    },
  });
};

/****************************** Delete Category********************************/
export const handleDeleteCategory = async (id: number | string) => {
  try {
    const response = await api({
      url: "/admin/deleteTicketCategory",
      method: "DELETE",
      data: { categoryId: String(id) },
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number | string) => handleDeleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["helpandsupport"] });
    },
  });
};
/*************************** SubCategory List *********************************/
const hadleSubCategoryList = async (id: number | undefined) => {
  try {
    const response = await api({
      url: "/admin/listSubCategory",
      method: "GET",
      params: {
        categoryId: id,
      },
    });
    if (response?.data?.responseCode === 200) {
      // toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useSubCategoryList = (id: number | undefined) => {
  return useQuery({
    queryKey: ["subcategorylist"],
    queryFn: () => hadleSubCategoryList(id),
    enabled: !!id,
  });
};

/********************************* Add subCategory  *********************************/
const hanldeAddSubCateogry = async (data: AddSubCategoryPayload) => {
  try {
    const response = await api({
      url: "/admin/addSubCategory",
      method: "POST",
      data: data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useAddSubcategory = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (data: AddSubCategoryPayload) => hanldeAddSubCateogry(data),
    onSuccess: (data) => {
      if (data?.data?.responseCode === 200) {
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      }
    },
  });
};

/************************************* Update SubCategory *************************************/
const handleUpdateSubCategory = async (data: UpdateSubCategoryPayload) => {
  try {
    const response = await api({
      url: "/admin/editSubCategory",
      method: "PUT",
      data: data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useUpdateSubCategory = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateSubCategoryPayload) =>
      handleUpdateSubCategory(data),
    onSuccess: (data) => {
      if (data?.data?.responseCode === 200) {
        queryClient.invalidateQueries({ queryKey: ["subcategorylist"] });
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      }
    },
  });
};

/**************************************** Delete Sub Category  ********************************/
const handleDeleteSubCategory = async (id: number) => {
  try {
    const response = await api({
      url: "/admin/deleteSubCategory",
      method: "DELETE",
      data: { subCategoryId: id },
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useeDeleteSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => handleDeleteSubCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategorylist"] });
    },
  });
};

/***************************** Add Question and Answer ****************************************/
const handleQA = async (data: AddQAPayload) => {
  try {
    const response = await api({
      url: "/admin/addQuesAns",
      method: "POST",
      data: data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useQuestionAndAnswer = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (data: AddQAPayload) => handleQA(data),
    onSuccess: (data) => {
      if (data?.data?.responseCode === 200) {
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      }
    },
  });
};

/************************************* View Question and Answer ************************/
const handleViewQA = async (id: number | undefined) => {
  try {
    const response = await api({
      url: "/admin/listQuesAns",
      method: "GET",
      params: {
        subCategoryId: id,
      },
    });
    if (response?.data?.responseCode === 200) {
      // toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};
export const useViewQA = (id: number | undefined) => {
  return useQuery({
    queryKey: ["view-question-answer", id],
    queryFn: () => handleViewQA(id),
    enabled: !!id,
  });
};
