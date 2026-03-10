import { useMutation } from "@tanstack/react-query";
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