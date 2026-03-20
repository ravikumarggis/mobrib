import toast from "react-hot-toast";
import { api } from "../services/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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


export interface updateDisputePayload {
  registrationFee: number;
  taskCommissionFee: number;
  cancellationFee: number;
}

export const fetchUserList = async (filter: FilterType) => {
  try {
    const response = await api({
      url: `/admin/disputeList`,
      method: "GET",
      params: {
        search: filter?.search || undefined,
        userType: filter?.filter,

        limit: 10,
        page: filter?.page || 1,
      },
    });
    return response;
  } catch (error: any) {
    console.error("API error:", error);
    return error?.response;
  }
};

export const useDisputeList = (filter: FilterType) => {
  return useQuery({
    queryKey: ["userList", filter],
    queryFn: () => fetchUserList(filter),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data?.data?.result;
      } else {
        return null;
      }
    },
  });
};

const handleResponse = (response: any) => {
  if (response?.data?.responseCode === 200) {
    console.log("jjjjjjjjj", response?.data?.result);

    return response?.data?.result; // adjust if your API structure differs
  } else {
    throw new Error(response?.data?.responseMessage || "Something went wrong");
  }
};

const handleGetFeeStructure = async (id: string) => {
  try {
    const response = await api({
      url: "/admin/viewDispute", // change if different
      method: "GET",
      params: { _id: id },
    });

    return handleResponse(response);
  } catch (error: any) {
    toast.error(
      error?.response?.data?.responseMessage || "Failed to fetch fee structure"
    );
    throw error;
  }
};

export const useGetDispiteDetail = (id: string) => {
  return useQuery({
    queryKey: ["viewDispute", id],
    queryFn: () => handleGetFeeStructure(id), // ✅ return
    enabled: !!id,
  });
};


const handleUpdateDispute = async (data: updateDisputePayload) => {
  try {
    const response = await api({
      url: "/admin/updateDispute", // change if different
      method: "POST",
      data,
    });

    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response?.data;
    } else {
      throw new Error(response?.data?.responseMessage);
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage || "Update failed");
    throw error;
  }
};

export const useUpdateDispute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: updateDisputePayload) =>
      handleUpdateDispute(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["FeeStructure"] });
    },
  });
};