import toast from "react-hot-toast";
import { api } from "../services/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { convertDataFormateForServer, PayloadText } from "../utils";
interface ticketStatusPayLoad {
  ticketId: number | null;
  status: string;
}
interface ticketChatPayLoad {
  ticketId: number;
  message?: string;
  image?: string;
}

type FilterType = {
  search?: string;
  QueryStatus?:string,
  deviceType?: string;
  fromDate?: string;
  toDate?: string;
  userType?: string;
  page?: string | null;
  filterBy?: string;
  ticketId?: string;
  categoryType?: string;
  userTag?: string;
  isGuestUser?: string;
};

/*********************** Tickets List ***********************/
const handleTicketsList = async (filter?: FilterType) => {
  try {
    const response = await api({
      url: "/admin/queryTicketList",
      method: "GET",
      params: {
       
        search: filter?.search || undefined,
        ticketStatus: filter?.filterBy || undefined,
        ticketId: filter?.ticketId || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
        categoryType: filter?.categoryType || undefined,
        page: filter?.page ? filter?.page : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useTicketsList = (filter?: FilterType) => {
  return useQuery({
    queryKey: ["ticketList", filter],
    queryFn: () => handleTicketsList(filter),
  });
};

/************************************* ticket Details ***************************/
const handleTicketsDetails = async (id: string | undefined) => {
  try {
    const response = await api({
      url: "/admin/ticketDetails",
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

// ****************************************** ticket  CSV  download ******************************************************
export const useTicketsListCSV = (filter?: FilterType, isDownloadCsv?: boolean) => {
  return useQuery({
    queryKey: ["ticketDetailsCSV", filter],
    queryFn: () => handleTicketsDetailsCSV(filter),
    enabled: isDownloadCsv
  });
};

/************************************* ticket Details ***************************/
const handleTicketsDetailsCSV = async (filter: any | undefined) => {
  try {
    const response = await api({
      url: "/admin/queryTicketCSV",
      method: "GET",
      params: {
        isNewUser: filter?.userTag ? PayloadText.OverAllFunds(filter?.userTag) : undefined,
        isGuestUser: filter?.isGuestUser ? PayloadText.TicketListGestUser(filter?.isGuestUser) : undefined,
        isTestUser:
          filter?.userType == "Real User"
            ? 1
            : filter?.userType == "admin"
              ? 2
              : filter?.userType == "sub_admin"
                ? 3
                : filter?.userType == "Test User"
                  ? "true"
                  : undefined,
        filterBy: filter?.filterBy || undefined,
        search: filter?.search || undefined,
        ticketId: filter?.ticketId || undefined,
        fromDate: filter?.fromDate || undefined,
        toDate: filter?.toDate || undefined,
        categoryType: filter?.categoryType || undefined,
        // kycFilter: "",
      },
    });
    if (response?.data?.responseCode === 200) {
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useTicketsDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ["ticketDetails"],
    queryFn: () => handleTicketsDetails(id),
  });
};

/************************************* ticket status ***************************/
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

/****************************  ticketc chat *********************/
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
