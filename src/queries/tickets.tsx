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

interface ticketStatusPayLoad {
  ticketId: number | null;
  status: string;
}

interface ticketChatPayLoad {
  ticketId: number;
  message?: string;
  image?: string;
}

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




export const useTicketsDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ["ticketDetails"],
    queryFn: () => handleTicketsDetails(id),
  });
};


const handleTicketsDetails = async (id: string | undefined) => {
  try {
    const response = await api({
      url: "/admin/viewTicketDetails",
      method: "GET",
      params: { ticketId: id },
    });
    if (response?.data?.responseCode === 200) {
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};





const handleTicketChat = async (data: ticketChatPayLoad) => {
  try {
    const response = await api({
      url: "/admin/reply",
      method: "POST",
      data: data,
    });
    if (response?.data?.responseCode === 200) {
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
  }
};

export const useTicketChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["ChatHistrory"],
    mutationFn: (data: ticketChatPayLoad) => handleTicketChat(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetails"] });
    },
  });
};


const handleTicketStatus = async (data: ticketStatusPayLoad) => {
  try {
    const response = await api({
      url: "/admin/updateTicket",
      method: "POST",
      data: data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useTicketStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ticketStatusPayLoad) => handleTicketStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetails"] });
    },
  });
};



// const handleTicketsList = async (filter?: FilterType) => {
//   try {
//     const response = await api({
//       url: "/admin/queryTicketList",
//       method: "GET",
//       params: {
//         isNewUser: filter?.userTag ? PayloadText.OverAllFunds(filter?.userTag) : undefined,
//         isGuestUser: filter?.isGuestUser ? PayloadText.TicketListGestUser(filter?.isGuestUser) : undefined,
//         isTestUser:
//           filter?.userType == "Real User"
//             ? 1
//             : filter?.userType == "admin"
//               ? 2
//               : filter?.userType == "sub_admin"
//                 ? 3
//                 : filter?.userType == "Test User"
//                   ? "true"
//                   : undefined,
//         search: filter?.search || undefined,
//         filterBy: filter?.filterBy || undefined,
//         ticketId: filter?.ticketId || undefined,
//         fromDate: filter?.fromDate
//           ? convertDataFormateForServer(filter?.fromDate)
//           : undefined,
//         toDate: filter?.toDate
//           ? convertDataFormateForServer(filter?.toDate)
//           : undefined,
//         categoryType: filter?.categoryType || undefined,
//         page: filter?.page ? filter?.page : undefined,
//       },
//     });
//     if (response?.data?.responseCode === 200) {
//       return response;
//     }
//   } catch (error: any) {
//     // toast.error(error?.response?.data?.responseMessage);
//     return error;
//   }
// };

// export const useTicketsList = (filter?: FilterType) => {
//   return useQuery({
//     queryKey: ["ticketList", filter],
//     queryFn: () => handleTicketsList(filter),
//   });
// };
