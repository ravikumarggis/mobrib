import toast from "react-hot-toast";
import { api } from "../services/apiServices";
import { useMutation } from "@tanstack/react-query";

interface VerifiedOrRejectedCryptoInrwithdrawlPlayload {
  id: number;
  action: string;
  message?: string;
  transactionId?: string;
  modeType?: string;
}

const handleApproveRejectCrptoWithdraw = async (
  data: VerifiedOrRejectedCryptoInrwithdrawlPlayload
) => {
  try {
    const response = await api({
      url: "/admin/approveRejectWithdraw",
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

export const useApproveRejectCrptoWithdraw = () => {
  return useMutation({
    mutationFn: (data: VerifiedOrRejectedCryptoInrwithdrawlPlayload) =>
      handleApproveRejectCrptoWithdraw(data),
  });
};
