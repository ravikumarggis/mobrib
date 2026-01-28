import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/apiServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export type tokenAddType = {
  supply: string | undefined;
  symbol: string | undefined;
  name: string | undefined;
  icon: string | undefined;
  usdt_price: string | undefined;
  tokenType: string | undefined;
  decimal_places: string | undefined;
  decimal_places_in_usdt: string | undefined;
  decimal_places_in_inr: string | undefined;
  isSelf: string | undefined;
  contract_type: string | undefined;
  blockchain: string | undefined;
  contract_address: string | undefined;
  amount: string;
  isDepositWithdrawal: string;
  type: string;
  listingDate: string;
  allNetwork: [];
  isHotCoin: boolean;
  min_deposit_limit: string;
  min_withdraw_limit: string;
  deposit_fee: string;
  max_withdraw_limit: string;
  withdrawal_fee: string;
  inr_price: string;
  manualDes?: string
  ucid: number
};

type FilterType = {
  symbol?: string;
  walletType?: string;
  TokenType?: string;
};

interface activeInactivePayload {
  is_deposit?: boolean;
  is_withdrawal?: boolean;
  contract_type?: string;
  symbol?: string;
  blockchain?: string;
  isHotCoin?: boolean;

  min_withdraw_limit?: number;
  max_withdraw_limit?: number;
  max_deposit_limit?: number;
  min_deposit_limit?: number;
  depositFee?: number;
  withdrawFee?: number;
  decimal_places_in_usdt?: number;
  decimal_places?: number;
  decimal_places_in_inr?: number;
  ucid: number;
}

export const addTokenManual = async ({
  supply,
  symbol,
  name,
  icon,
  usdt_price,
  tokenType,
  decimal_places,
  decimal_places_in_usdt,
  isSelf,
  allNetwork,
  contract_address,
  listingDate,
  manualDes,
  ucid,
  decimal_places_in_inr
}: tokenAddType) => {
  try {
    const response = await api({
      url: "/admin/addTokenManual",
      method: "POST",
      data: {
        supply,
        symbol,
        name,
        icon,
        usdt_price,
        tokenType,
        decimal_places,
        decimal_places_in_usdt,
        isSelf,
        allNetwork,
        contract_address,
        listingDate,
        manualDes,
        ucid,
        decimal_places_in_inr
      },
    });

    return response;
  } catch (error: any) {
    console.error("API error:", error);
    return error?.response;
  }
};

export const getTokenMetaData = async ({
  address,
  symbol,
}: {
  address?: string | undefined;
  symbol?: string | undefined;
}) => {
  try {
    const response = await api({
      url: "/admin/addTokenAdmin",
      method: "POST",
      data: {
        address: address || undefined,
        symbol: symbol || undefined,
      },
    });
    if (response?.data?.responseCode === 200) {
      toast.success(response?.data?.responseMessage);
      return response?.data || null;
    } else {
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.error);
    return null;
  }
};

export const useTokenList = (filter?: FilterType) => {
  return useQuery({
    queryKey: ["getcontract", filter],
    queryFn: async () => {
      // return await api({
      //   url: "/admin/getcontract",
      //   method: "GET",
      //   params: {
      //     symbol: filter?.symbol
      //       ? filter.symbol.toUpperCase()
      //       : filter?.walletType
      //         ? filter.walletType
      //         : undefined,
      //     tokenType:
      //       filter?.TokenType === "Rapid Token"
      //         ? "rapidToken"
      //         : filter?.TokenType === "Platform Token"
      //           ? "platformToken"
      //           : undefined,
      //   },
      // });
      try {
        const response = await api({
          url: "/admin/getcontract",
          method: "GET",
          params: {
            symbol: filter?.symbol
              ? filter.symbol.toUpperCase()
              : filter?.walletType
                ? filter.walletType
                : undefined,
            tokenType:
              filter?.TokenType === "Rapid Token"
                ? "rapidToken"
                : filter?.TokenType === "Platform Token"
                  ? "platformToken"
                  : undefined,
          },
        });
        return response;
      } catch (error: any) {
        toast.error(error?.response?.data?.responseMessage);
        return error;
      }
    },
    select(data) {
      return data?.data || [];
    },
  });
};

/************************************  withdrawal desposit ACIVIE AND INACTIVE *************/
export const handleDespositwithdrawal = async (data: tokenAddType) => {
  const {
    isDepositWithdrawal,
    type,
    symbol,
    amount,
    supply,
    name,
    icon,
    inr_price,
    tokenType,
    decimal_places,
    decimal_places_in_usdt,
    decimal_places_in_inr,
    isSelf,
    contract_address,
    contract_type,
    blockchain,
    listingDate,
    isHotCoin,
    manualDes,
    ucid
  } = data;

  try {
    const response = await api({
      url: "/admin/updateCrptoSetting",
      method: "POST",
      data: {
        ...(type !== "isHotCoin" && {
          symbol: symbol,
          ...(type === "withdrawal" && { is_withdrawal: isDepositWithdrawal }),
          ...(type === "deposit" && { is_deposit: isDepositWithdrawal }),
          ...(amount && { inr_price: amount }),
          supply: supply,
          name: name,
          icon: icon,
          inr_price: inr_price || amount,
          tokenType: tokenType,
          decimal_places: decimal_places,
          decimal_places_in_usdt: decimal_places_in_usdt,
          decimal_places_in_inr: decimal_places_in_inr,
          isSelf: isSelf,
          contract_address: contract_address,
          contract_type: contract_type,
          blockchain: blockchain,
          listingDate: listingDate,
          manualDes: manualDes,
          ucid: ucid
        }),
        ...(type === "isHotCoin" && { isHotCoin: isHotCoin, symbol: symbol }),
      },
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

export const useDepositWithdrawal = (
  Type: string | undefined,
  onSuccessCallback: () => void
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: any) => handleDespositwithdrawal(data),
    onSuccess: () => {
      if (Type == "tokenEdit") {
        navigate("/token-list");
      }
      onSuccessCallback();
    },
  });
};

const handleActiveInactiveDespositWithdrwalToken = async (
  data: activeInactivePayload
) => {
  try {
    const response = await api({
      url: "/admin/updatedepositwithdrawsetting",
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

export const useActiveInactiveDespositWithdrwa = (
  onSuccessCallback: () => void
) => {
  return useMutation({
    mutationFn: (data: activeInactivePayload) =>
      handleActiveInactiveDespositWithdrwalToken(data),
    onSuccess: (data) => {
      if (data?.responseCode === 200) {
        onSuccessCallback();
      }
    },
  });
};

export const ListBlockchainData = async (symbol: string) => {
  try {
    const response = await api({
      url: "/admin/listBlockchainData",
      method: "GET",
      params: { symbol },
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    }
  } catch (error: any) {
    return error?.response;
  }
};

export const useListBlockchainData = (symbol: string) => {
  return useQuery({
    queryKey: ["ListBlockchainData"],
    queryFn: () => ListBlockchainData(symbol),
    enabled: !!symbol,
  });
};

/********************************************** Unique CoinList *************************/

const handleUniqueCoinList = async () => {
  try {
    const response = await api({
      url: "/user/coinList",
      method: "GET",
    });
    if (response?.data?.responseCode === 200) {
      return response?.data;
    }
  } catch (error: any) {
    return error?.response;
  }
};

export const useUniqueCoinList = () => {
  return useQuery({
    queryKey: ["UniqueCoinList"],
    queryFn: () => handleUniqueCoinList(),
  });
};

export const useCoinList = () => {
  return useQuery({
    queryKey: ["getCoin"],
    queryFn: async () => {
      return await api({
        url: "/admin/getCurrencies",
        method: "GET",
      });
    },
    select(data) {
      return data?.data || [];
    },
  });
};
