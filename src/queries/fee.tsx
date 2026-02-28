import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/apiServices";
import toast from "react-hot-toast";

/* ================================
   TYPES
================================ */

export interface FeeStructurePayload {
  registrationFee: number;
  taskCommissionFee: number;
  cancellationFee: number;
}

/* ================================
   COMMON RESPONSE HANDLER
================================ */

const handleResponse = (response: any) => {
  if (response?.data?.responseCode === 200) {
    return response?.data?.result; // adjust if your API structure differs
  } else {
    throw new Error(response?.data?.responseMessage || "Something went wrong");
  }
};

/* ================================
   GET FEE STRUCTURE
================================ */

const handleGetFeeStructure = async () => {
  try {
    const response = await api({
      url: "/admin/getFee", // change if different
      method: "GET",
    });

    return handleResponse(response);
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage || "Failed to fetch fee structure");
    throw error;
  }
};

export const useGetFeeStructure = () => {
  return useQuery({
    queryKey: ["FeeStructure"],
    queryFn: handleGetFeeStructure,
  });
};

/* ================================
   UPDATE FEE STRUCTURE
================================ */

const handleUpdateFeeStructure = async (data: FeeStructurePayload) => {
  try {
    const response = await api({
      url: "/admin/updateFee", // change if different
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

export const useUpdateFeeStructure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FeeStructurePayload) =>
      handleUpdateFeeStructure(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["FeeStructure"] });
    },
  });
};