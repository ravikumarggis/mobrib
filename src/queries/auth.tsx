import { useQuery } from "@tanstack/react-query";
import { api } from "../services/apiServices";

export const login = async (
  mobileNumber: string | undefined,
  otp: string | undefined
) => {
  try {
    const response = await api({
      url: "/admin/verifyLoginOtp",
      method: "POST",
      data: {
        mobileNumber,
        otp,
      },
    });
    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    select(data) {
      if (data?.data?.responseCode == 200) {
        return data?.data?.result;
      } else {
        return {};
      }
    },
  });
};

export const profile = async () => {
  try {
    const response = await api({
      url: "/admin/viewProfile",
      method: "GET",
    });
    return response;
  } catch (error: any) {
    return error?.response;
  }
};
