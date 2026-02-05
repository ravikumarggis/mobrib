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
type VerifiedOrRejectedTaskPlayload = {
  _id?: string;
  taskProgress?: string;
 
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
export const fetchTaskDetail = async ( id: string) => {
  try {
    const response = await api({
      url: `/admin/viewTask`,
      method: "GET",
      params: {
      
     
        _id: id || undefined,
      
        
    
     
      },
    });
    return response;
  } catch (error: any) {
    console.error("API error:", error);
    return error?.response;
  }
};



export const useTaskDetail = ( id: string) => {
  return useQuery({
    queryKey: ["userList", id],
    queryFn: () => fetchTaskDetail( id),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data?.data?.result;
      } else {
        return {};
      }
    },
   
  });
};



const handleTaskUpdate = async (
  data: VerifiedOrRejectedTaskPlayload
) => {
  try {
    const response = await api({
      url: "/admin/updateTask",
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

export const useApproveRejectTaskDetail = () => {
  return useMutation({
    mutationFn: (data: VerifiedOrRejectedTaskPlayload) =>
      handleTaskUpdate(data),
  });
}; 

const handleBidUpdate = async (
  data: VerifiedOrRejectedTaskPlayload
) => {
  try {
    const response = await api({
      url: "/admin/updateBid",
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
export const useApproveRejectBid = () => {
  return useMutation({
    mutationFn: (data: VerifiedOrRejectedTaskPlayload) =>
      handleBidUpdate(data),
  });
}; 
