import toast from "react-hot-toast";
import { api, zuelBaseURl } from "../services/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
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



/************************************** Crypto Desposite Request List  **********************************/


export const fetchWithdrawList = async ( filter: FilterType) => {
  try {
    const response = await api({
      url: `/admin/withdrawList`,
      method: "GET",
      params: {
      
     
        search: filter?.search || undefined,
        withdrawStatus:
          filter?.filter === "Pending"
            ? "PENDING"
            : filter?.filter === "Verified"
              ? "VERIFIED" 
              : filter?.filter === "Rejected"
              ? "REJECTED" 
              :  filter?.filter,
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
export const useWithdrawList = ( filter: FilterType) => {
  return useQuery({
    queryKey: ["withdrawList", filter],
    queryFn: () => fetchWithdrawList( filter),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data?.data?.result;
      } else {
        return null;
      }
    },
   
  });
};

