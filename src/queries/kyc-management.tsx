import toast from "react-hot-toast";
import { api } from "../services/apiServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convertDataFormateForServer, PayloadText } from "../utils";

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

interface VerifiedOrRejectedKycPlayload {
  id: number;
  action: string;
  message?: string;
  transactionId?: string;
  modeType?: string;
}

export const fetchKycList = async (filter: FilterType) => {
  try {
    const response = await api({
      url: `/admin/kycList`,
      method: "GET",
      params: {
        search: filter?.search || undefined,
        kycStatus:
          filter?.filter === "Pending"
            ? "PENDING"
            : filter?.filter === "Verified"
            ? "VERIFIED"
            : filter?.filter === "Rejected"
            ? "REJECTED"
            : filter?.filter,
        // depositStatus: filter?.filter || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
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
export const useKycList = (filter: FilterType) => {
  return useQuery({
    queryKey: ["kycList", filter],
    queryFn: () => fetchKycList(filter),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data?.data?.result;
      } else {
        return null;
      }
    },
  });
};

// useKycList

const handleApproveRejectKyc = async (
  data: VerifiedOrRejectedKycPlayload
) => {
  try {
    const response = await api({
      url: "/admin/approveRejectKyc",
      method: "PUT",
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

export const useApproveRejectKyc = () => {
  return useMutation({
    mutationFn: (data: VerifiedOrRejectedKycPlayload) =>
      handleApproveRejectKyc(data),
  });
};
