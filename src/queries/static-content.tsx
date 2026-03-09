import toast from "react-hot-toast";
import { api } from "../services/apiServices";
import { useMutation, useQuery } from "@tanstack/react-query";

interface EditStaticContentPayload {
  _id: string | undefined;
  title: string;
  description: string;
}

/********************** content list ******************************/
const handleStaticContentList = async () => {
  try {
    const response = await api({
      url: "/static/staticContentList",
      method: "GET",
    });
    if (response?.data?.responseCode === 200) {
      // toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const useStaticContentList = () => {
  return useQuery({
    queryKey: ["static-content"],
    queryFn: handleStaticContentList,
  });
};

/***************************** view static content *******************/
const handleViewStaticContent = async (type: string | undefined) => {
  try {
    const response = await api({
      url: "/static/viewStaticContent",
      method: "GET",
      params: { type },
    });
    if (response?.data?.responseCode === 200) {
      // toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    // toast.error(
    //   error?.response?.data?.responseMessage || "Something went wrong"
    // );
    return error;
  }
};

export const useViewStaticContent = (type: string | undefined) => {
  return useQuery({
    queryKey: ["view-static-content"],
    queryFn: () => handleViewStaticContent(type),
    enabled: !!type,
  });
};

/************************** Edit static content ********************/
const handleEditStaticContent = async (data: EditStaticContentPayload) => {
  try {
    const response = await api({
      url: "/static/editStaticContent",
      method: "PUT",
      data:data,
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

export const useEditStaticContent = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (data: EditStaticContentPayload) =>
      handleEditStaticContent(data),
    onSuccess: (data) => {
      if (data?.data?.responseCode === 200) {
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      }
    },
  });
};
