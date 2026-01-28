import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/apiServices";
import toast from "react-hot-toast";
import { convertDataFormateForServer, PayloadText } from "../utils";

type FilterType = {
  selected?: string;
  symbol?: string;
  orderType?: string;
  page?: number | string | null | undefined;
};

interface PlaceOrderPayload {
  id: number | string;
  pair: string;
}

interface TradeFilterType {
  symbol?: string;
  page?: number | undefined;
  fromDate?: string;
  toDate?: string;
  coinValue?: string | undefined;
  search?: string;
  isNewUser?: string;
  isTestUser?: string;
  orderType?: string | undefined;
}
// **********************************Get admin dashboard user data ***************************************
export const useGetTotaluserCount = () => {
  return useQuery({
    queryKey: ["getTotaluserCount"],
    queryFn: () => getTotaluserCount(),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data?.data?.result;
      } else {
        return [];
      }
    },
  });
};

export const getTotaluserCount = async () => {
  try {
    const response = await api({
      url: "/admin/totaluserCount",
      method: "GET",
    });
    return response;
  } catch (error: any) {
    console.error("API error:", error);
    return error?.response;
  }
};

//  ************************************** deposit ************************************************************************
export const useGetTotalDepsitWithdrawalCount = () => {
  return useQuery({
    queryKey: ["useGetTotalDepsitWithdrawalCount"],
    queryFn: () => handleTotalDepsitWithdrawalCount(),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data?.data?.result;
      } else {
        return [];
      }
    },
  });
};

export const handleTotalDepsitWithdrawalCount = async () => {
  try {
    const response = await api({
      url: "/admin/countWD",
      method: "GET",
    });
    return response;
  } catch (error: any) {
    console.error("API error:", error);
    return error?.response;
  }
};

// **********************************Get admin deposit and withdrawal data***************************************
export const useGetLineChart = (debouncedFilter: {}) => {
  return useQuery({
    queryKey: ["getLineChartData", debouncedFilter],
    queryFn: () => getDepositAndWithdrawalLineChart(debouncedFilter),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data?.data?.result;
      } else {
        return [];
      }
    },
  });
};

export const getDepositAndWithdrawalLineChart = async (
  debouncedFilter: FilterType
) => {
  try {
    const response = await api({
      url: "/admin/depositWithdrawLinChart",
      method: "GET",
      params: {
        filter: debouncedFilter?.selected
          ? String(debouncedFilter?.selected)?.toLocaleLowerCase()
          : undefined,
        symbol: debouncedFilter?.symbol ? debouncedFilter?.symbol : "USDT",
      },
    });
    return response;
  } catch (error: any) {
    console.error("API error:", error);
    return error?.response;
  }
};

/*********************************************** Get all 10+1 data(subscription) *************************************/
const userInstallmentDashboard = async () => {
  try {
    const response = await api({
      url: "/installment/userInstallmentDashBoard",
      method: "GET",
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error?.error?.response?.data;
  }
};

export const useUserInstallmentDashboard = () => {
  return useQuery({
    queryKey: ["userInstallmentDashboard"],
    queryFn: userInstallmentDashboard,
  });
};

/***************************************** Buy and Sell Charbar *************************** */

const handleBuyandSellChart = async (val: string) => {
  try {
    const response = await api({
      url: "/admin/hotCoin",
      method: "GET",
      params: { filter: val },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error?.error?.response?.data;
  }
};

export const useBuyandSell = (val: string) => {
  return useQuery({
    queryKey: ["BuyandSellChart", val],
    queryFn: () => handleBuyandSellChart(val),
  });
};

/*****************************************************************************************************/
/*****************************************************************************************************/
/*****************************************************************************************************/
/**************************************** Buy OR Sell Coin Checking **********************************/

const handleDataLiquidityPool = async () => {
  try {
    const response = await api({
      url: "/admin/addDataLiquidityPool",
      method: "POST",
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error?.response?.data;
  }
};

export const useDataLiquidityPool = () => {
  return useMutation({
    mutationFn: () => handleDataLiquidityPool(),
  });
};

const handleListDataLiquidityPool = async (filter: FilterType) => {
  try {
    const response = await api({
      url: "/admin/listDataLiquidityPool",
      method: "GET",
      params: {
        filter:
          filter?.orderType === "Buy"
            ? "buy"
            : filter?.orderType === "Sell"
              ? "sell"
              : undefined,
        page: filter?.page || 1,
        limit: 10,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error?.error?.response?.data;
  }
};

export const useListDataLiquidityPool = (filter: FilterType) => {
  return useQuery({
    queryKey: ["ListDataLiquidityPool", filter],
    queryFn: () => handleListDataLiquidityPool(filter),
  });
};

const handleGetBalance = async () => {
  try {
    const response = await api({
      url: "/admin/getBalance",
      method: "GET",
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error?.error?.response?.data;
  }
};

export const useGetBalance = () => {
  return useQuery({
    queryKey: ["useGetBalance"],
    queryFn: handleGetBalance,
  });
};

const handlePlaceOrder = async (data: PlaceOrderPayload) => {
  try {
    const response = await api({
      url: "/admin/placeOrder",
      method: "POST",
      data,
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error?.response?.data;
  }
};

export const usePlaceOrder = () => {
  return useMutation({
    mutationFn: (data: PlaceOrderPayload) => handlePlaceOrder(data),
  });
};

const handleGetPrice = async (symbol: string) => {
  try {
    const response = await api({
      url: "/admin/maxcGetPrice",
      method: "GET",
      params: { symbol },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error?.error?.response?.data;
  }
};

export const useGetPrice = (symbol: string) => {
  return useQuery({
    queryKey: ["GetPrice"],
    queryFn: () => handleGetPrice(symbol),
  });
};

const handlePlaceOrderStatus = async (data: string | number) => {
  try {
    const response = await api({
      url: "/admin/checkOrderStatus",
      method: "POST",
      data: { id: data },
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error?.response?.data;
  }
};

export const usePlaceOrderStatus = () => {
  return useMutation({
    mutationFn: (data: string | number) => handlePlaceOrderStatus(data),
  });
};

export const useGetDistributionReward = (filter: any) => {
  return useQuery({
    queryKey: ["GetDistributionReward", filter],
    queryFn: () => handleDistributionReward(filter),
  });
};

const handleDistributionReward = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/distributedRewardFund",
      method: "GET",
      params: {
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data?.result;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return null;
  }
};

export const useGetOverallFund = (filter: any) => {
  return useQuery({
    queryKey: ["handleOverallFund", filter],
    queryFn: () => handleOverallFund(filter),
  });
};

const handleOverallFund = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/overallFund",
      method: "GET",
      params: {
        wallet_type: String(filter?.search)?.toUpperCase() || undefined,
        isNewUser: filter?.isNewUser
          ? PayloadText.OverAllFunds(filter?.isNewUser)
          : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data?.result;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

// *************************** user activity  *****************************************************

export const useGetActivityList = (filter: any) => {
  return useQuery({
    queryKey: ["handleActivityUserList", filter],
    queryFn: () => handleGerUserActivity(filter),
  });
};

const handleGerUserActivity = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/adminActivityList",
      method: "GET",
      params: {
        search: filter?.search || undefined,
        page: filter?.page || undefined,
        moduleType: filter?.moduleType || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data?.result;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

// ********************************* sub admin details    **********************************************************************

export const useGetSubAdminDetails = (filter: any, userId: any) => {
  return useQuery<any>({
    queryKey: ["SubAdminDetails", filter, userId],
    queryFn: () => handleGetSubAdminDetails(filter, userId),
    select(data) {
      if (data?.data?.responseCode === 200) {
        return data.data.result;
      } else {
        return [];
      }
    },
  });
};

const handleGetSubAdminDetails = async (filter: any, userId: any) => {
  try {
    const response = await api({
      url: "admin/subAdminActivityList",
      method: "GET",
      params: {
        userId: userId,
        search: filter?.search || undefined,
        page: filter.page || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
        moduleType: filter?.moduleType || undefined,
      },
    });
    return response;
  } catch (error: any) {
    // toast.error(error?.response?.data?.responseMessage);
    return error.response?.data;
  }
};

export const useUserWalletFund = (filter: any) => {
  return useQuery({
    queryKey: ["userWalletFund", filter],
    queryFn: () => handleUserWalletFund(filter),
  });
};

const handleUserWalletFund = async (filter: any) => {
  try {
    const response = await api({
      url: "/admin/userAllWDFundList",
      method: "GET",
      params: {

        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        search: filter?.search,
        page: filter?.page || undefined,
        sortType: filter?.sortType
          ? PayloadText.UserAllFund(filter?.sortType)
          : PayloadText.UserAllFund("depositTOP"),
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data?.result;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

export const useUserOverallFundsList = (
  filter: any,
  symbol: string | undefined,
  isNewUser?: any
) => {
  return useQuery({
    queryKey: ["UserOverallFundsList", filter, symbol, isNewUser],
    queryFn: () => handleUserOverallFundsList(filter, symbol, isNewUser),
  });
};

const handleUserOverallFundsList = async (
  filter: any,
  symbol: string | undefined,
  isNewUser: any
) => {
  try {
    const response = await api({
      url: "/admin/userOverallFundsList",
      method: "GET",
      params: {
        page: filter?.page || undefined,
        search: filter?.search,
        wallet_type: symbol || undefined,
        sortType:
          PayloadText.ViewOverAllFunds(filter?.sortType) ||
          PayloadText.ViewOverAllFunds("Top"),
        limit: 10,
        isNewUser:
          filter?.userTag || isNewUser
            ? PayloadText.OverAllFunds(filter?.userTag || isNewUser)
            : undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data?.result;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

/*********************************************** Module Type *******************************/

const handleActivityHistoryType = async () => {
  try {
    const response = await api({
      url: "/admin/activityHistoryType",
      method: "GET",
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

export const useActivityHistoryType = () => {
  return useQuery({
    queryKey: ["ActivityHistoryType"],
    queryFn: handleActivityHistoryType,
  });
};

/*********************************************** Trading Data *******************************/
const handleTradingData = async (
  id?: string | undefined,
  filter?: TradeFilterType
) => {
  try {
    const response = await api({
      url: "/admin/tradeStatistics",
      method: "GET",
      params: {
        isNewUser: filter?.isNewUser ? PayloadText.UserTag(filter?.isNewUser) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        symbol: filter?.coinValue ? filter?.coinValue : id ? id : undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
        limit: 10,
        orderType: filter?.orderType
          ? PayloadText.TradeActivityDetails(filter?.orderType)
          : undefined,
        search: filter?.search || undefined,
        page: filter?.page || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

export const useTradingData = (
  id: any,
  filter: any
) => {
  return useQuery({
    queryKey: ["TradingData", filter, id],
    queryFn: () => handleTradingData(id, filter),
  });
};

const handleTotalDetails = async () => {
  try {
    const response = await api({
      url: "/admin/feeWithTotalWD",
      method: "GET",
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.responseMessage);
    return error?.error?.response?.data;
  }
};

export const useTotalDetails = () => {
  return useQuery({
    queryKey: ["TotalDetails"],
    queryFn: handleTotalDetails,
  });
};



const handleViewDistributionReward = async (filter: any, id: string | undefined) => {
  try {
    const response = await api({
      url: "/admin/viewDistributedRewardFund",
      method: "GET",
      params: {
        rewardType: id || undefined,
        search: filter?.search || undefined,
        isNewUser: filter?.userTag ? PayloadText.OverAllFunds(filter?.userTag) : undefined,
        isTestUser: filter?.isTestUser ? PayloadText.UserType(filter?.isTestUser) : undefined,
        symbol1: filter?.coinValue || undefined,
        fromDate: filter?.fromDate
          ? convertDataFormateForServer(filter?.fromDate)
          : undefined,
        toDate: filter?.toDate
          ? convertDataFormateForServer(filter?.toDate)
          : undefined,
        limit: 10,
        page: filter?.page || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const useViewDistributionReward = (filter: any, id: string | undefined) => {
  return useQuery({
    queryKey: ["ViewDistributionReward", filter, id],
    queryFn: () => handleViewDistributionReward(filter, id),
  });
};
