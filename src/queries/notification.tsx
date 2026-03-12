import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/apiServices";
import toast from "react-hot-toast";

interface SendNotificationPayload {
  role: string;
  heading: string;
  msg: string;
}

const sendNotification = async (data: SendNotificationPayload) => {
  const response = await api({
    url: "/admin/sendNotification",
    method: "POST",
    data,
  });

  if (response?.data?.responseCode === 200) {
    toast.success(response?.data?.responseMessage);
  }

  return response?.data;
};

export const useSendNotification = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: sendNotification,
    onSuccess: () => {
      onSuccess?.();
    },
  });
};

export const fetchNotificationList = async () => {
  try {
    const response = await api({
      url: `/admin/notificationList`,
      method: "GET",
      //   params: {
      //     search: filter?.search || undefined,
      //     userType: filter?.filter,

      //     limit: 10,
      //     page: filter?.page || 1,
      //   },
    });
    return response;
  } catch (error: any) {
    console.error("API error:", error);
    return error?.response;
  }
};
export const useNotificationList = () => {
  return useQuery({
    queryKey: ["listCategory"],
    queryFn: () => fetchNotificationList(),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data?.data?.result || [];
      } else {
        return null;
      }
    },
  });
};
