import toast from "react-hot-toast";
import { api } from "../services/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const fetchUserList = async ( filter: FilterType) => {
  try {
    const response = await api({
      url: `/admin/taskList`,
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



export const useTaskList = ( filter: FilterType) => {
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
