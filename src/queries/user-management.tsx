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


interface VerifiedOrRejectedUserPlayload {
  _id: number;
  status: string;
 
}


/************************************** Crypto Desposite Request List  **********************************/


export const fetchUserList = async ( filter: FilterType) => {
  try {
    const response = await api({
      url: `/admin/userList`,
      method: "GET",
      params: {
      
     
        search: filter?.search || undefined,
        userType:
           filter?.filter,
        
    
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
export const useUserList = ( filter: FilterType) => {
  return useQuery({
    queryKey: ["userList", filter],
    queryFn: () => fetchUserList( filter),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data?.data?.result;
      } else {
        return null;
      }
    },
   
  });
};



const handleApproveRejectCrptoWithdraw = async (
  data: VerifiedOrRejectedUserPlayload
) => {
  try {
    const response = await api({
      url: "/admin/blockDeleteUser",
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

export const useApproveRejectUserDetail = () => {
  return useMutation({
    mutationFn: (data: VerifiedOrRejectedUserPlayload) =>
      handleApproveRejectCrptoWithdraw(data),
  });
}; // useApproveRejectUserDetail
