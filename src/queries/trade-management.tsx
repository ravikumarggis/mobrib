import { useQuery } from "@tanstack/react-query";
import { api } from "../services/apiServices";

export const getAdminFastTradeSetting = async () => {
  try {
    const response = await api({
      url: "/admin/getAdminFastTradeSetting",
      method: "POST",
      data: {
        buySellCoinType: "USDT",
      },
    });

    return response?.data || null;
  } catch (error) {
    return null;
  }
};

export const useGetAdminFastTradeSetting = () => {
  return useQuery({
    queryKey: ["getAdminFastTradeSetting"],
    queryFn: getAdminFastTradeSetting,
    select(data) {
      if (data?.responseCode === 200) {
        return data?.result;
      } else {
        return [];
      }
    },
  });
};

export const addUpdateCrptoSetting = async ({
  fees,
  sellFee,
  buyFee,
  mark_down_fees,
  mark_up_fees,
  symbol,
  is_buy_fast_trade,
  is_sell_fast_trade,
  buyTDS,
  sellTDS,
  buySellCoinType = "USDT",
}: {
  buySellCoinType?: "INR" | "USDT";

  fees?: string | undefined;
  sellFee?: string | undefined;
  buyFee?: string | undefined;
  mark_down_fees?: string | undefined;
  mark_up_fees?: string | undefined;
  symbol?: string | undefined;
  is_buy_fast_trade?: boolean | undefined;
  is_sell_fast_trade?: boolean | undefined;
  buyTDS?: string | undefined;
  sellTDS?: string | undefined;
}) => {
  try {
    const response = await api({
      url: "/admin/addUpdateCrptoSetting",
      method: "POST",
      data: {
        buySellCoinType,
        fees,
        sellFee,
        buyFee,
        mark_down_fees,
        mark_up_fees,
        symbol,
        is_buy_fast_trade,
        is_sell_fast_trade,
        buyTDS,
        sellTDS,
      },
    });

    return response?.data || null;
  } catch (error) {
    return null;
  }
};

export const useListAdminTradeAmount = () => {
  return useQuery({
    queryKey: ["listAdminTradeAmount"],
    queryFn: listAdminTradeAmount,
    select(data) {
      if (data?.responseCode === 200) {
        return data?.result;
      } else {
        return [];
      }
    },
  });
};

export const listAdminTradeAmount = async () => {
  try {
    const response = await api({
      url: "/admin/listAdminTradeAmount",
      method: "GET",
    });

    return response?.data || [];
  } catch (error) {
    return [];
  }
};

export const addUpdateAdminTradeAmount = async ({
  wallet_type,
  wallet_amount,
  threshold_amount,
}: {
  wallet_type?: string | undefined;
  wallet_amount?: string | undefined;
  threshold_amount?: string | undefined;
}) => {
  try {
    const response = await api({
      url: "/admin/addUpdateAdminTradeAmount",
      method: "POST",
      data: {
        wallet_type,
        wallet_amount,
        threshold_amount,
      },
    });

    return response?.data || null;
  } catch (error) {
    return null;
  }
};

export const useAdminliquidityCode = () => {
  return useQuery({
    queryKey: ["adminliquidityCode"],
    queryFn: adminliquidityCode,
    select(data) {
      if (data?.responseCode === 200) {
        return data?.result?.tradeAdminWalletCode;
      } else {
        return "";
      }
    },
  });
};

export const adminliquidityCode = async () => {
  try {
    const response = await api({
      url: "/admin/adminliquidityCode",
      method: "GET",
    });

    return response?.data || [];
  } catch (error) {
    return [];
  }
};

export interface updateCrptoSettingType {
  withdrawal_limit?: number | undefined;
  min_deposit_limit?: number | undefined;
  min_withdraw_limit?: number | undefined;
  deposit_fee?: number | undefined;
  daily_withdraw_limit?: number | undefined;
  max_withdraw_limit?: number | undefined;
  is_withdrawal?: number | undefined;
  decimal_places_in_inr?: number | undefined;
  decimal_places?: number | undefined;
  decimal_places_in_usdt?: number | undefined;
  withdrawal_fee?: number | undefined;
  symbol?: string | undefined;
  blockchain: string | undefined;
}

export const updateCrptoSetting = async ({
  withdrawal_limit,
  min_deposit_limit,
  min_withdraw_limit,
  deposit_fee,
  daily_withdraw_limit,
  max_withdraw_limit,
  is_withdrawal,
  decimal_places_in_inr,
  decimal_places,
  decimal_places_in_usdt,
  withdrawal_fee,
  symbol,
  blockchain,
}: updateCrptoSettingType) => {
  try {
    const response = await api({
      url: "/admin/updateCrptoSetting",
      method: "POST",
      data: {
        withdrawal_limit,
        min_deposit_limit,
        min_withdraw_limit,
        deposit_fee,
        daily_withdraw_limit,
        max_withdraw_limit,
        is_withdrawal,
        decimal_places_in_inr,
        decimal_places,
        decimal_places_in_usdt,
        withdrawal_fee,
        symbol,
        blockchain,
      },
    });

    return response?.data || null;
  } catch (error) {
    return null;
  }
};
