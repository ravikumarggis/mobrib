import toast from "react-hot-toast";
import { api } from "../services/apiServices";
import { useMutation, useQuery } from "@tanstack/react-query";

type FilterType = {
  search?: string;
  filter?: string;
  fromDate?: string;
  toDate?: string;
  page?: string | null;
  symbol?: string;
  isNewUser?: string;
  isTestUser?: string;
};


interface deleteCategoryPlayload {
  categoryTitle: string;
 
}

/************************************** Crypto Desposite Request List  **********************************/

export const fetchCategoryList = async () => {
  try {
    const response = await api({
      url: `/admin/listCategory`,
      method: "GET",
      //   params: {
      //     search: filter?.search || undefined,
      //     userType: filter?.filter,

      //     limit: 10,
      //     page: filter?.page || 1,
      //   },
    });
    return response;
  } catch (error: any) {
    console.error("API error:", error);
    return error?.response;
  }
};
export const useCategoryList = () => {
  return useQuery({
    queryKey: ["listCategory"],
    queryFn: () => fetchCategoryList(),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data?.data?.result || [];
      } else {
        return null;
      }
    },
  });
};


const handleDeleteCategory = async (
  data: deleteCategoryPlayload
) => {
  try {
    const response = await api({
      url: "/admin/deleteCategory",
      method: "DELETE",
      data: data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      
      return response?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error?.response?.data;
  }
};

export const useDeleteCategory = (
  
) => {
  return useMutation({
    mutationFn: (data: deleteCategoryPlayload) =>
      handleDeleteCategory(data),
  });
};
