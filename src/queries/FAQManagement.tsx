import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/apiServices";
import toast from "react-hot-toast";

interface AddUpdateFQAPayload {
question: string; answer: string ; _id?:string
  
}

const handleListFAQCategory = async () => {
  try {
    const response = await api({
      url: "/admin/listFAQCategory",
      method: "GET",
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const useListFAQCategory = () => {
  return useQuery({
    queryKey: ["listFAQCategory"],
    queryFn: handleListFAQCategory,
  });
};

const handleAddUpdateFAQ = async (data: AddUpdateFQAPayload) => {
  try {
    const response = await api({
      url: data?._id ?  "/static/editFAQ" :  "/static/addFAQ",
      method: data?._id ? "PUT" : "POST",
      data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useAddUpdateFAQ = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddUpdateFQAPayload) => handleAddUpdateFAQ(data),
    onSuccess: () => {
      onSuccessCallback();
      queryClient.invalidateQueries({ queryKey: ["FAQList"] });
    },
  });
};

const handleFAQList = async () => {
  try {
    const response = await api({
      url: "/static/faqList",
      method: "GET",
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const useFAQList = () => {
  return useQuery({
    queryKey: ["FAQList"],
    queryFn: handleFAQList,
  });
};
