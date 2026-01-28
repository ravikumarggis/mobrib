import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/apiServices";
import toast from "react-hot-toast";
import { convertDataFormateForServer, PayloadText } from "../utils";

interface FilterType {
  search?: string;
  filter?: string;
  fromDate?: string;
  toDate?: string;
  page?: string | null;
  symbol?: string;
  dealStatus?: string;
  isClamed?: string;
  status?: string;
  isNewUser?: string
  isTestUser?: string;
}

/****************************************************************************************/
/**************************** Download User ListCSV *************************************/
const handledownloadUserListCSV = async () => {
  try {
    const response = await api({
      method: "POST",
      url: "/admin/downloadUserListCSV",
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const usedownloadUserListCSV = () => {
  return useMutation({
    mutationFn: () => handledownloadUserListCSV(),
  });
};


/***********************************************************************************************/
/**************************** Download Banlacelog ListCSV **************************************/
const handledownloadBanlanceListCSV = async (filter: any, id?: any) => {
  try {
    const response = await api({
      method: "POST",
      url: "/admin/downloadBalanceLogCSV",
      data: {
        userId: id || undefined,
        search: filter?.search || undefined,
        fromDate: filter?.fromDate || undefined,
        toDate: filter?.toDate || undefined,
        historyType: filter?.historyType || undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        status: filter?.status ? PayloadText.BalanceLog(filter?.status) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const usedownloadBanlanceListCSV = (filter: any, id?: any, isDownloadCsv?: any) => {
  return useQuery({
    queryKey: ["downladBalanceLogCsv", filter, id],
    queryFn: () => handledownloadBanlanceListCSV(filter, id),
    enabled: isDownloadCsv,

  });
};


/************************************************************************************************/
/**************************** Download Banlacelog ListCSVIU *************************************/
const handledownloadBanlanceListCSVIV = async (filter: any, id?: any) => {
  try {
    const response = await api({
      method: "POST",
      url: "/admin/userBalanceLogCSV",
      data: {
        userId: id,
        search: filter?.search || undefined,
        historyType: filter?.historyType || undefined,
        fromDate: filter?.fromDate || undefined,
        toDate: filter?.toDate || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const usedownloadBanlanceListCSVIV = (filter: any, id?: any) => {
  return useQuery({
    queryKey: ["downladBalanceLogCsviv", filter, id],
    queryFn: () => handledownloadBanlanceListCSVIV(filter, id),
  });
};


/*********************************************************************************/
/**************************** Download tds  **************************************/
const handledownloadTdsListCSV = async (userId: any, filter: any) => {
  try {
    const response = await api({
      url: "/admin/fastTradeListDownloadCSV",
      method: "POST",
      data: {
        userId: Number(userId),
        filter: filter?.orderType?.toLocaleLowerCase() || undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter.toDate) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error;
  }
};

export const usedownloadTdsListCSV = (userId: any, filter: any, isDownloadCsv?: any) => {
  return useQuery({
    queryKey: ["downloadTdsListCSV", filter, userId],
    queryFn: () => handledownloadTdsListCSV(userId, filter),
    enabled: isDownloadCsv
  });
};


/********************************************************************************************/
/**************************** Download Deposit INR CSV  *************************************/
const handleDepositInrCSV = async (filter: FilterType, type?: string) => {
  try {
    const response = await api({
      url: "/admin/inrDepositReqCSV",
      method: "POST",
      data: {
        depositType: type || undefined,
        search: filter?.search || undefined,
        filter: filter?.filter || undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        isNewUser: filter?.isNewUser ? PayloadText.OverAllFunds(filter?.isNewUser) : undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter?.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter?.toDate) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    throw error;
  }
};

export const useDepositInrCSV = (filter: FilterType, type?: string, isDownloadCsv?: any) => {
  return useQuery({
    queryKey: ["depositInrCSV", filter],
    queryFn: () => handleDepositInrCSV(filter, type),
    enabled: isDownloadCsv,
  });
};


/***********************************************************************************************/
/**************************** Download Deposit Crypto CSV  *************************************/
const handleDepositCryptoCSV = async (filter: FilterType) => {
  try {
    const response = await api({
      url: "/admin/crytpoDepositRequestCSV",
      method: "POST",
      data: {
        search: filter?.search || undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        symbol: filter?.symbol ? String(filter?.symbol)?.toUpperCase() : undefined,
        depositStatus: filter?.filter ? PayloadText.DepositCryptoCSVDepositStatus(filter?.filter) : undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter?.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter?.toDate) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    throw error;
  }
};

export const useDepositCryptoCSV = (filter: FilterType) => {
  return useQuery({
    queryKey: ["DepositCryptoCSV", filter],
    queryFn: () => handleDepositCryptoCSV(filter),
    enabled: !!filter,
  });
};

/************************************************************************************************/
/**************************** Download Withdraw Crypto CSV  *************************************/
const handleWithdrawCryptoInrCSV = async (filter: FilterType, type: string) => {
  try {
    const response = await api({
      // url: "/admin/cryptoWithdrawCSV",
      url: "/admin/cryptoWithdrawCSVnew",
      method: "POST",
      data: {
        type,
        search: filter?.search || undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        filter: filter?.filter ? PayloadText.WithdrawCryptoCSVStatus(filter?.filter) : undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter?.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter?.toDate) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error;
  }
};

export const useWithdrawCryptoInrCSV = (filter: FilterType, type: string, isDownloadCsv: any) => {
  return useQuery({
    queryKey: ["WithdrawCryptoInrCSV", filter],
    queryFn: () => handleWithdrawCryptoInrCSV(filter, type),
    enabled: isDownloadCsv,
  });
};

/***********************************************************************************************/
/**************************** Download Wallet Address CSV  *************************************/
const handleWallteAddressCSV = async (filter: FilterType) => {
  try {
    const response = await api({
      url: "/admin/walletaddressCSV",
      method: "POST",
      data: {
        search: filter?.search || undefined,
        filter: filter?.filter || undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter.toDate) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    throw error;
  }
};

export const useWallteAddressCSV = (filter: FilterType) => {
  return useQuery({
    queryKey: ["WallteAddressCSV", filter],
    queryFn: () => handleWallteAddressCSV(filter),
    enabled: !!filter,
  });
};


/****************************************************************************************************/
/**************************** Download deals subscriptions CSV  *************************************/

const handleDealsSubscriptionsCSV = async (id: number | string, filter: FilterType, type: string, isCheck: boolean) => {
  if (type !== "View" || !isCheck) return;

  try {
    const response = await api({
      url: "/admin/dealsSubscriptionCSV",
      method: "POST",
      data: {
        planId: Number(id),
        search: filter?.search || undefined,
        filter: filter?.filter ? filter?.filter : undefined,
        dealStatus: filter?.dealStatus || undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter?.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter?.toDate) : undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    throw error;
  }
};

export const useDealsSubscriptionsCSV = (id: number | string, filter: FilterType, type: string, isCheck: boolean) => {
  return useQuery({
    queryKey: ["DealsSubscriptionsCSV", filter],
    queryFn: () => handleDealsSubscriptionsCSV(id, filter, type, isCheck),
    enabled: !!id,
  });
};





/*****************************************************************************************************************/
/**************************** Download feed back CSV  ***********************************************************/
const handlefeedbackCSV = async (filter: FilterType) => {
  try {
    const response = await api({
      url: "/feedback/getFeedbackCSV",
      method: "POST",
      data: {
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        search: filter?.search || undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter?.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter?.toDate) : undefined,
        filter: filter?.filter ? filter?.filter : undefined,
        dealStatus: filter?.dealStatus || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    throw error;
  }
};

export const usefeedbackCSV = (filter: FilterType) => {
  return useQuery({
    queryKey: ["feedbackCSV", filter],
    queryFn: () => handlefeedbackCSV(filter),
    enabled: !!filter,
  });
};




/*******************************************************************************************************/
/**************************** Download Nowory11 subscriptions CSV  *************************************/
const handleNowory11SubscriptionsCSV = async (filter: FilterType) => {
  try {
    const response = await api({
      url: "/installment/subscribedUsersCSV",
      method: "POST",
      data: {
        search: filter?.search || undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    throw error;
  }
};

export const useNowory11SubscriptionsCSV = (filter: FilterType) => {
  return useQuery({
    queryKey: ["Nowory11SubscriptionsCSV", filter],
    queryFn: () => handleNowory11SubscriptionsCSV(filter),
    enabled: !!filter,
  });
};




/*****************************************************************************************************/
/**************************** Download drops subscriptions CSV  *************************************/

const handleDropsSubscriptionsCSV = async (planId: number | string | undefined, filter: FilterType) => {
  try {
    const response = await api({
      url: "noworyDrop/downloadcsvData",
      method: "GET",
      params: {
        planId: planId,
        search: filter?.search || undefined,
        dealStatus: filter?.dealStatus || undefined,
        filter: filter?.filter ? filter?.filter : undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter?.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter?.toDate) : undefined,
        isNewUser: filter?.isNewUser ? Boolean(PayloadText.UserTag(filter?.isNewUser)) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
      },
    });

    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    throw error;
  }
};

export const useDropsSubscriptionsCSV = (planId: number | string | undefined, filter: FilterType) => {
  return useQuery({
    queryKey: ["DeropsSubscriptionsCSV", filter],
    queryFn: () => handleDropsSubscriptionsCSV(planId, filter),
    enabled: !!planId,
  });
};


/**********************************************************************************************************/
/*******************************Nowory11 subscription user plan csv ***************************************/
const handleNowory11PlanSubscriptionsCSV = async (userId: number | string | undefined, filter: FilterType) => {
  try {
    const response = await api({
      url: "/installment/downloadInstallmentcsv",
      method: "GET",
      params: {
        userId: userId,
        filter: filter?.search === "Pre Redemtion" ? "PRE_REDEMTION" : filter?.status === "Terminated" ? "TERMINATE" : filter?.status?.toLocaleUpperCase() || undefined,
        ...(filter?.isClamed && { isClaimed: filter?.isClamed === "Redeem" ? "true" : "false" }),
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter?.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter?.toDate) : undefined,
      },
    });

    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    throw error;
  }
};

export const useNowory11PlanSubscriptionsCSV = (userId: number | string | undefined, filter: FilterType) => {
  return useQuery({
    queryKey: ["Nowory11PlanSubscriptionsCSV", filter],
    queryFn: () => handleNowory11PlanSubscriptionsCSV(userId, filter),
    enabled: !!userId,
  });
};


/********************************************************************************************/
/**************************************** User All Fund *************************************/
const handleUserAllFundsCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/userAllWDFundListCSV",
      method: "POST",
      data: {
        search: filter?.search || undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        sortType: filter?.sortType ? PayloadText.UserAllFund(filter?.sortType) : PayloadText.UserAllFund("Deposit Top"),
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    throw error;
  }
};

export const useUserAllFundsCSV = (filter: any) => {
  return useQuery({
    queryKey: ["UserAllFundsCSV", filter],
    queryFn: () => handleUserAllFundsCSV(filter),
    enabled: !!filter,
  });
};


/********************************************************************************************/
/**************************************** User All Fund CSV**********************************/
const handleOverAllFundsCSV = async (filter: any, symbol: string | undefined) => {
  try {
    const response = await api({
      url: "/admin/userOverallFundsListCSV",
      method: "GET",
      params: {
        search: filter?.search || undefined,
        wallet_type: symbol || undefined,
        sortType: PayloadText.ViewOverAllFunds(filter?.sortType) || PayloadText.ViewOverAllFunds("Top"),
        isNewUser: filter?.userTag ? PayloadText.OverAllFunds(filter?.userTag) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    throw error;
  }
};

export const useOverAllFundsCSV = (filter: any, symbol: string | undefined) => {
  return useQuery({
    queryKey: ["OverAllFundsCSV", filter],
    queryFn: () => handleOverAllFundsCSV(filter, symbol),
    enabled: !!filter,
  });
};


/********************************************************************************************/
/**************************************** User Email Mobile  Update CSV *************************************/
const handleEmailMobileCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/chnageEmailMobileListCSV",
      method: "POST",
      data: {
        search: filter?.search || undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        filter: filter?.ModuleType === "Mobile Update" ? "Mobile_UPDATE" : "EMAIL_UPDATE",
        status: filter?.EmailMobileStatus === "Approved" ? "APPROVED" : filter?.EmailMobileStatus === "Rejected" ? "REJECTED" : undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter.toDate) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error;
  }
};

export const useEmailMobileCSV = (filter: any) => {
  return useQuery({
    queryKey: ["EmailMobileCSV", filter],
    queryFn: () => handleEmailMobileCSV(filter),
    enabled: !!filter,
  });
};

const handleUserBankCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/listBankCSV",
      method: "POST",

      data: {
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        search: filter?.search || undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter?.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter?.toDate) : undefined,
        filter: filter?.filter === "Verified" ? "verified" : filter?.filter === "Pending" ? "pending" : filter?.filter === "Rejected" ? "rejected" : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error;
  }
};

export const useUserBankCSV = (filter: any) => {
  return useQuery({
    queryKey: ["UserBankCSV", filter],
    queryFn: () => handleUserBankCSV(filter),
    enabled: !!filter,
  });
};

const handleKYCCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/kycListCSV",
      method: "POST",
      data: {
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        search: filter?.search || undefined,
        deviceType: filter?.deviceType || undefined,
        fromDate:
          (filter?.fromDate && convertDataFormateForServer(filter?.fromDate)) ||
          undefined,
        toDate:
          (filter?.toDate && convertDataFormateForServer(filter?.toDate)) ||
          undefined,
        userType:
          filter?.userType == "user"
            ? 1
            : filter?.userType == "admin"
              ? 2
              : filter?.userType == "sub_admin"
                ? 3
                : filter?.userType == "test_user"
                  ? 4
                  : undefined,
        // kycStatus: filter?.kycStatus || undefined,


        // filter:
        //   filter?.ModuleType == "Pending"
        //     ? "IN-PROCESS"
        //     : filter?.ModuleType?.toLocaleUpperCase() || undefined,

        filter:
          filter?.kycStatus == "Pending"
            ? "IN-PROCESS"
            : filter?.kycStatus?.toLocaleUpperCase() || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error;
  }
};

export const useKYCCSV = (filter: any) => {
  return useQuery({
    queryKey: ["useKYCCSV", filter],
    queryFn: () => handleKYCCSV(filter),
    enabled: !!filter,
  });
};

/****************************** Trade Activity list csv ********************************************/
/***************************************************************************************************/
/****************************************************************************************************/
const handleTradeActivityCSV = async (filter: any, id: string | undefined) => {
  try {
    const response = await api({
      url: "/admin/downloadTradeStatisticsCsv",
      method: "GET",
      params: {
        // symbol: filter?.coinValue ? filter?.coinValue : undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        symbol: filter?.coinValue ? filter?.coinValue : id ? id : undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
        orderType: filter?.orderType
          ? PayloadText.TradeActivityDetails(filter?.orderType)
          : undefined,
        search: filter?.search || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useTradeActivityCSV = (filter: any, id: string | undefined) => {
  return useQuery({
    queryKey: ["TradeActivityCSV", filter, id],
    queryFn: () => handleTradeActivityCSV(filter, id),
    enabled: !!filter,
  });
};

/****************************** Reward distribution list csv ********************************************/
/***************************************************************************************************/
/****************************************************************************************************/
const handleRewardDistributionCSV = async (
  filter: any,
  id: string | undefined
) => {
  try {
    const response = await api({
      url: "/admin/downloadDistributedRewardFund",
      method: "GET",
      params: {
        rewardType: id || undefined,
        search: filter?.search || undefined,
        symbol1: filter?.coinValue || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
        isNewUser: filter?.userTag
          ? PayloadText.OverAllFunds(filter?.userTag)
          : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useRewardDistributionCSV = (
  filter: any,
  id: string | undefined
) => {
  return useQuery({
    queryKey: ["RewardDistributionCSV", filter, id],
    queryFn: () => handleRewardDistributionCSV(filter, id),
    enabled: !!filter,
  });
};

/****************************** Tracking Active User list csv ********************************************/
/***************************************************************************************************/
/****************************************************************************************************/
const handleTrackingActiveUserCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadActiveUsersCSV",
      method: "GET",
      params: {
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        filter: filter?.filter
          ? filter?.filter === "24 hours"
            ? "24h"
            : filter?.filter === "7 days"
              ? "7d"
              : filter?.filter === "15 days"
                ? "15d"
                : filter?.filter === "30 days"
                  ? "30d"
                  : filter?.fromDate && filter?.toDate
                    ? "custom"
                    : "24h"
          : filter?.fromDate && filter?.toDate
            ? "custom"
            : "24h",

        search: filter?.search || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useTrackingActiveUserCSV = (filter: any) => {
  return useQuery({
    queryKey: ["TrackingActiveUserCSV", filter],
    queryFn: () => handleTrackingActiveUserCSV(filter),
    // enabled: !!filter,
  });
};


/****************************** Tracking Active User Activity list csv ********************************************/
/***************************************************************************************************/
/****************************************************************************************************/
const handleTrackingActiveUserActivityCSV = async (filter: any, userId: any) => {
  try {
    const response = await api({
      url: "/admin/downloadSubAdminActivityListCSV",
      method: "GET",
      params: {
        userId: userId,
        search: filter?.search || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
        moduleType: filter?.moduleType || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useTrackingActiveUserActivityCSV = (filter: any, userId: any) => {
  return useQuery({
    queryKey: ["TrackingActiveUserActivityCSV", filter, userId],
    queryFn: () => handleTrackingActiveUserActivityCSV(filter, userId),
    enabled: !!filter,
  });
};

/******************************   OVER All Withdrawall Freeze list csv ********************************************/
/***************************************************************************************************/
/****************************************************************************************************/
const handleOverAllWithdrawalCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadListFreezWithdrawCSV",
      method: "GET",
      params: {
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        search: filter?.search || undefined,
        type: PayloadText.OverAllFundFreeze(filter?.type) || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useOverAllWithdrawalCSV = (filter: any) => {
  return useQuery({
    queryKey: ["OverAllWithdrawalCSV", filter],
    queryFn: () => handleOverAllWithdrawalCSV(filter),
    enabled: !!filter,
  });
};

/******************************   Asset Wise Users Fund Freeze list csv ********************************************/
/***************************************************************************************************/
/****************************************************************************************************/
const handleAssetWiseUsersFundFreezeCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadLockFundListCSV",
      method: "GET",
      params: {
        isNewUser: filter?.isNewUser ? PayloadText.OverAllFunds(filter?.isNewUser) : undefined,
        freezeId: filter?.freezeId || undefined,
        symbol: filter?.coinValue || undefined,
        search: filter?.search || undefined,
        type: filter?.type || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useAssetWiseUsersFundFreezeCSV = (filter: any) => {
  return useQuery({
    queryKey: ["AssetWiseUsersFundFreezeCSV", filter],
    queryFn: () => handleAssetWiseUsersFundFreezeCSV(filter),
    enabled: !!filter,
  });
};


/******************************   Asset Wise Users Fund Lock list csv ******************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handleAssetWiseUsersFundLockCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadLockFundListUserCSV",
      method: "GET",
      params: {
        isNewUser: filter?.isNewUser ? PayloadText.OverAllFunds(filter?.isNewUser) : undefined,
        symbol: filter?.coinValue || undefined,
        lockId: filter?.lockId || undefined,
        search: filter?.search || undefined,
        type: filter?.type || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
      },

    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useAssetWiseUsersFundLockCSV = (filter: any) => {
  return useQuery({
    queryKey: ["AssetWiseUsersFundLockCSV", filter],
    queryFn: () => handleAssetWiseUsersFundLockCSV(filter),
    enabled: !!filter,
  });
};



/******************************   Refferal History list csv ******************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handleRefferalHistoryCSV = async (filter: any, userId: any) => {
  try {
    const response = await api({
      url: "/admin/downloadReferralListUserCSV",
      method: "GET",
      params: {
        userId: userId || undefined,
        search: filter?.search || undefined,
        isNewUser: filter?.isNewUser ? PayloadText.OverAllFunds(filter?.isNewUser) : undefined,
      },

    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useRefferalHistoryCSV = (filter: any, userId: any) => {
  return useQuery({
    queryKey: ["RefferalHistoryCSV", filter, userId],
    queryFn: () => handleRefferalHistoryCSV(filter, userId),
  });
};



/******************************   Refferal History list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handleAddUserFudCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadAddFundManualCSV",
      method: "GET",
      params: {
        isNewUser: filter?.isNewUser ? PayloadText.OverAllFunds(filter?.isNewUser) : undefined,
        filter: filter?.filter || undefined,
        search: filter?.search || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter.toDate)
          : undefined,
        moduleType: filter?.moduleType,
        walletType: filter?.symbol
          ? String(filter?.symbol)?.toLocaleUpperCase()
          : undefined,
      },

    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useAddUserFudCSV = (filter: any) => {
  return useQuery({
    queryKey: ["AddUserFudCSV", filter],
    queryFn: () => handleAddUserFudCSV(filter),
  });
};


/******************************   Nowory11 Invited User list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handleNowory11InvitedUserCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/installment/getAllInviteCodeAdminCSV",
      method: "GET",
      params: {
        userType: filter?.isNewUser ? PayloadText.Nowory11InvitedUser(filter?.isNewUser) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        search: filter?.search || undefined,
      }
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useNowory11InvitedUserCSV = (filter: any) => {
  return useQuery({
    queryKey: ["Nowory11InvitedUserCSV", filter],
    queryFn: () => handleNowory11InvitedUserCSV(filter),
  });
};




/******************************   Support Contact Us list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesSupportContactsCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadNewsLatterListCSV",
      method: "GET",
      params: {
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        mobileNumber: filter?.mobileNumber || undefined,
        email: filter?.email || undefined,
        reasonType: filter?.reasonType || undefined,
        // fromDate: filter?.fromDate
        //     ? convertDataFormateForServer(filter?.fromDate)
        //     : undefined,
        // toDate: filter?.toDate
        //     ? convertDataFormateForServer(filter?.toDate)
        //     : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useSupportContactsCSV = (filter: any) => {
  return useQuery({
    queryKey: ["SupportContactsCSV", filter],
    queryFn: () => handlesSupportContactsCSV(filter),
  });
};




/******************************   Activity Point list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesActivityPointCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadMiningManagementDataCSV",
      method: "GET",
      params: {
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        filter: filter?.filter || undefined,
        search: filter?.search || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter.toDate)
          : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useActivityPointCSV = (filter: any) => {
  return useQuery({
    queryKey: ["ActivityPointCSV", filter],
    queryFn: () => handlesActivityPointCSV(filter),
  });
};


/******************************   Holding Point list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesHoldingPointCSV = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadHolingPointUserListCSV",
      method: "GET",
      params: {
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        filter: filter?.filter || undefined,
        search: filter?.search || undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter.toDate) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useHoldingPointCSV = (filter: any) => {
  return useQuery({
    queryKey: ["HoldingPointCSV", filter],
    queryFn: () => handlesHoldingPointCSV(filter),
  });
};



/******************************   Activity Point Details list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesDetailsActivityPointCSV = async (filter: any,
  email: string,
  id: string | undefined) => {
  try {
    const response = await api({
      url: "/admin/downloadUserMiningHistoryCSV",
      method: "GET",
      params: {
        userId: id || undefined,
        filter: filter?.filter || undefined,
        search: email ? email : filter?.search,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter.toDate)
          : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const useDetailsActivityPointCSV = (filter: any,
  email: string,
  id: string | undefined) => {
  return useQuery({
    queryKey: ["DetailsActivityPointCSV", filter, email, id],
    queryFn: () => handlesDetailsActivityPointCSV(filter, email, id),
  });
};



/******************************   Holding Point Details list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesDetailsHoldingPointCSV = async (
  filter: any,
  id: number | string | undefined,
  type: string
) => {
  try {
    if (type === "Holding Points") {
      const response = await api({
        url: "/admin/downloadHolingPointHistoryCSV",
        method: "GET",
        params: {
          userId: id,
          filter: filter?.filter || undefined,
          search: filter?.search || undefined,
          fromDate: filter?.fromDate
            ? convertDataFormateForServer(filter.fromDate)
            : undefined,
          toDate: filter?.toDate
            ? convertDataFormateForServer(filter.toDate)
            : undefined,
        },
      });
      if (response?.data?.responseCode === 200) {
        return response?.data;
      } else {
        return null;
      }
    }
  } catch (error: any) {
    return error?.response;
  }
};
export const useDetailsHoldingPointCSV = (
  filter: any,
  id: number | string | undefined,
  type: string
) => {
  return useQuery({
    queryKey: ["DetailsHoldingPointCSV", filter, id],
    queryFn: () => handlesDetailsHoldingPointCSV(filter, id, type),
  });
};


/******************************   Holding Point Details list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesParticularUserFundCSV = async (
  filter: any,
  uid: string | undefined
) => {
  try {
    const response = await api({
      url: "/admin/downloaduserFundsCSV",
      method: "GET",
      params: {
        userId: uid || undefined,
        filter: filter?.filter || undefined,
        wallet_type: filter?.coinValue || undefined,
        sortType: filter?.sortType ? PayloadText.UserFundDetails(filter?.sortType) : PayloadText.UserFundDetails("TOP"),
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response;
  }
};
export const useParticularUserFundCSV = (
  filter: any,
  uid: string | undefined
) => {
  return useQuery({
    queryKey: ["ParticularUserFundCSV", filter, uid],
    queryFn: () => handlesParticularUserFundCSV(filter, uid),
  });
};


/******************************  Particular User Trade  list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesParticularUserTradeCSV = async (
  filter: any,
  uid: string | undefined
) => {
  try {
    const response = await api({
      url: "/instaTrade/downloadFastTradeHistoryAdminCSV",
      method: "GET",
      params: {
        userId: uid || undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter?.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter?.toDate) : undefined,
        filter: filter?.orderType?.toLocaleLowerCase() || undefined,
        creditCurrency: filter?.coinValue || undefined,
        debitCurrency: filter?.debitCurrency || undefined,
        status: filter?.status || undefined,
        sortType: filter?.sortType ? PayloadText.ParticularUserTradeSortType(filter?.sortType) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response;
  }
};
export const useParticularUserTradeCSV = (
  filter: any,
  uid: string | undefined
) => {
  return useQuery({
    queryKey: ["ParticularUserTradeCSV", filter, uid],
    queryFn: () => handlesParticularUserTradeCSV(filter, uid),
  });
};

/******************************  Particular User Trade  list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesParticularUserWithdrawalCSV = async (
  filter: any,
  uid: string | undefined
) => {
  try {
    const response = await api({
      url: "/admin/downloadCryptoWithdrawlistCSV",
      method: "GET",
      params: {
        userId: uid || undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter.toDate) : undefined,
        filter: filter?.status == "Pending" ? "pending" : filter?.status,
        symbol: filter?.search?.toLocaleUpperCase() || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response;
  }
};
export const useParticularUserWithdrawalCSV = (
  filter: any,
  uid: string | undefined
) => {
  return useQuery({
    queryKey: ["ParticularUserWithdrawalCSV", filter, uid],
    queryFn: () => handlesParticularUserWithdrawalCSV(filter, uid),
  });
};


/******************************  Particular User Nowory11  list csv ****************************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesParticularUserNowory11CSV = async (
  filter: any,
  id: string | undefined
) => {
  try {
    const response = await api({
      url: "/installment/downloadGetSubscriptionUserCSV",
      method: "GET",
      params: {
        userId: id,
        status:
          filter?.search === "Pre Redemtion"
            ? "PRE_REDEMTION"
            : filter?.status === "Terminated"
              ? "TERMINATE"
              : filter?.status?.toLocaleUpperCase() || undefined,
        ...(filter?.isClamed && {
          isClaimed: filter?.isClamed === "Redeem" ? "true" : "false",
        }),
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response;
  }
};
export const useParticularUserNowory11CSV = (
  filter: any,
  id: string | undefined
) => {
  return useQuery({
    queryKey: ["ParticularUserNowory11CSV", filter, id],
    queryFn: () => handlesParticularUserNowory11CSV(filter, id),
  });
};


/******************************  Particular User Deposit  list csv ***********************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesParticularUserDepositCSV = async (filter: any, uid: string | undefined) => {
  try {
    const response = await api({
      url: "/admin/downloadDepositRequestListUserCSV",
      method: "GET",
      params: {
        depositStatus: filter?.depositStatus || undefined,
        userId: uid || "",
        depositType: "ALL",
        symbol: filter?.coinValue || undefined,
        fromDate: filter?.fromDate ? convertDataFormateForServer(filter?.fromDate) : undefined,
        toDate: filter?.toDate ? convertDataFormateForServer(filter?.toDate) : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response;
  }
};
export const useParticularUserDepositCSV = (filter: any, uid: string | undefined) => {
  return useQuery({
    queryKey: ["ParticularUserDepositCSV", filter, uid],
    queryFn: () => handlesParticularUserDepositCSV(filter, uid),
  });
};


/******************************  Particular User FundFreeze  list csv ***********************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesParticularUserFundFreezeCSV = async (uid: string | undefined, filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadGetLockFundUserCSV",
      method: "GET",
      params: {
        userId: uid,
        symbol: filter?.coinValue || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response;
  }
};
export const useParticularFundFreezeCSV = (uid: string | undefined, filter: any) => {
  return useQuery({
    queryKey: ["ParticularUserFundFreezeCSV", uid, filter],
    queryFn: () => handlesParticularUserFundFreezeCSV(uid, filter),
  });
};



/******************************  Particular User FundLock  list csv ***********************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesParticularUserFundLockCSV = async (uid: string | undefined, filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadLockFundListParticularUserCSV",
      method: "GET",
      params: {
        userId: uid,
        symbol: filter?.coinValue || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response;
  }
};
export const useParticularFundLockCSV = (uid: string | undefined, filter: any) => {
  return useQuery({
    queryKey: ["ParticularUserFundLockCSV", uid, filter],
    queryFn: () => handlesParticularUserFundLockCSV(uid, filter),
  });
};


/******************************  Particular User FundLock  list csv ***********************************/
/***************************************************************************************************/
/***************************************************************************************************/
const handlesAllUserTDS = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/downloadTotalTDSTradeCSV",
      method: "GET",
      params: {
        sortType: filter?.sortType ? PayloadText.SortTypeAllUserTDS(filter?.sortType) : undefined,
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        search: filter?.search || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response;
  }
};
export const useAllUserTDS = (filter: any, isDownloadCsv: any) => {
  return useQuery({
    queryKey: ["ParticularUserFundLockCSV", filter],
    queryFn: () => handlesAllUserTDS(filter),
    enabled: isDownloadCsv,

  });
};


/**************************************** */
const handleTradeVolumeUserCSV = async (filter: any, id: any) => {
  try {
    const response = await api({
      url: "/admin/tradeVolumeLeaderBoardCSV",
      method: "POST",
      data: {
        id: id,
        search: filter?.search || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error;
  }
};

export const useTradeVolumeUserCSV = (filter?: any, id?: any, isDownloadCsv?: any) => {
  return useQuery({
    queryKey: ["TradeVolumeUserCSV", filter, id],
    queryFn: () => handleTradeVolumeUserCSV(filter, id),
    enabled: isDownloadCsv,
  });
};