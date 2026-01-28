import { useQueryClient } from "@tanstack/react-query";
import { api } from "../services/apiServices";
import toast from "react-hot-toast";

// export const isLoggedIn = () => !!localStorage.getItem("token");
export const isLoggedIn = () => !!sessionStorage.getItem("token");

export const getImageURL = async (file: File | undefined) => {
  try {
    if (!file) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    const data = await api({
      method: "POST",
      url: "/user/uploadImageFile",
      data: formData,
    });

    if (data?.data?.responseCode == 200) {
      toast.success(data?.data?.responseMessage);
      return data?.data?.result?.url || null;
    } else {
      toast.error(data?.data?.responseMessage);
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return null;
  }
};

export const useInvalidateQueryByName = () => {
  const queryClient = useQueryClient();

  return (name: string) => {
    queryClient.invalidateQueries({ queryKey: [name] });
  };
};
