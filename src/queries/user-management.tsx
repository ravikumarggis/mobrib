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


export const fetchUserList = async ( filter: FilterType) => {
  try {
    const response = await api({
      url: `/admin/consultantList`,
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
    queryKey: ["consultantList", filter],
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

