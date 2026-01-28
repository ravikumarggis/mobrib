import { useMemo } from "react";

import { useUniqueCoinList } from "../../queries/token-management";
import DropDown from "./DropDown";

interface SelectDropDownProps {
  setFilter: (value: any) => void;
  filter: any;
}

const SelectDropDown = ({ setFilter, filter }: SelectDropDownProps) => {
  const { data: CoinListData } = useUniqueCoinList();

  const coinDataOption = useMemo(() => {
    return (
      CoinListData?.result?.map((item: { symbol: any }) => ({
        value: item?.symbol,
        label: item?.symbol,
      })) || []
    );
  }, [CoinListData?.result]);

  return (
    <>
      <DropDown
        options={coinDataOption}
        value={filter?.coinValue}
        placeholder="Select an option"
        onChange={(value: string) => {
          setFilter((p: any) => ({ ...p, coinValue: value }));
        }}
        className="dark:bg-dark-900"
      />
    </>
  );
};

export default SelectDropDown;

export const SelectDropDownDebit = ({
  setFilter,
  filter,
}: SelectDropDownProps) => {
  const { data: CoinListData } = useUniqueCoinList();

  const coinDataOption = useMemo(() => {
    return (
      CoinListData?.result?.map((item: { symbol: any }) => ({
        value: item?.symbol,
        label: item?.symbol,
      })) || []
    );
  }, [CoinListData?.result]);

  return (
    <>
      <DropDown
        options={coinDataOption}
        value={filter?.debitCurrency}
        placeholder="Select an option"
        onChange={(value: string) => {
          setFilter((p: any) => ({ ...p, debitCurrency: value }));
        }}
        className="dark:bg-dark-900"
      />
    </>
  );
};


export const SelectDropDownBuySellCoin = ({
  setFilter,
  filter,
}: SelectDropDownProps) => {
  const { data: CoinListData } = useUniqueCoinList();

  const coinDataOption = useMemo(() => {
    return (
      CoinListData?.result?.map((item: { symbol: any }) => ({
        value: item?.symbol,
        label: item?.symbol,
      })) || []
    );
  }, [CoinListData?.result]);

  return (
    <>
      <DropDown
        options={coinDataOption}
        value={filter?.buySellCoinType}
        placeholder="Select an option"
        onChange={(value: string) => {
          setFilter((p: any) => ({ ...p, buySellCoinType: value }));
        }}
        className="dark:bg-dark-900"
      />
    </>
  );
};
