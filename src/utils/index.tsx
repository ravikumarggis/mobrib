import moment from "moment";
import { useTokenList } from "../queries/token-management";

interface DetailRowProps {
  label: string;
  value: string | number;
  color?: any;
}

export const handleNegativeValue = (event: any) => {
  const {
    key,
    target: { value, selectionStart },
  } = event;
  const newValue =
    value.slice(0, selectionStart) + value.slice(selectionStart + 1);
  const parsedValue = parseFloat(newValue);
  if (
    ["ArrowUp", "ArrowDown", "-", "+", "e", "E"].includes(key) &&
    (isNaN(parsedValue) || parsedValue < 0)
  ) {
    event.preventDefault();
  }
};

export const handleWheelFocusBlur = (e: any) => {
  e.target.blur();
  setTimeout(() => {
    e.target.focus();
  }, 0);
};
export function sortAddress(str: string) {
  if (!str) return "";

  const len = str.length;

  if (len <= 8) return str;

  const keep = Math.floor(len * 0.3);
  const start = Math.ceil(keep / 1);
  const end = Math.floor(keep / 1);

  return `${str.slice(0, start)}...${str.slice(-end)}`;
}

export function newSortAddress(str: string, start: number, end: number) {
  if (!str) return "";

  const len = str.length;

  if (len <= 8) return str;

  return `${str.slice(0, start)}...${str.slice(-end)}`;
}

export function convertDateForceDayOne(inputDate: string) {
  if (!inputDate) {
    return null;
  }
  const [, month, year] = inputDate.split("/");
  return `${year}-${month.padStart(2, "0")}-01 06:13:52`;
}

export function dateFormate(dateData: string) {
  const date = new Date(dateData);
  const formatted = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
  return formatted;
}

/******************************** UTC DATE FORMATE ********************/
export function convertDataFormateForServer(inputDate: string) {
  const [day, month, year] = inputDate.split("/").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  return utcDate.toISOString();
}

export function DateTimeFormate(inputDate: string, time: string): string {
  const [day, month, year] = inputDate?.split("/");
  const isoString = `${year}-${month}-${day}T${time}:00`;
  return isoString;
}

export const Pagination = ({
  filter,
  table,
  row,
}: {
  filter: any;
  table: any;
  row: any;
}) => {
  const totalPage = filter?.page || 1;
  const pagesSize = table?.getState()?.pagination?.pageSize;
  return totalPage > 1
    ? totalPage * pagesSize + row?.index + 1 - 10
    : row?.index + 1;
};

export const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  color,
}) => {
  return (
    <div className=" dark:text-white flex justify-between items-center w-[100%]">
      <span className=" dark:text-white text-gray-600 font-medium">
        {label}
      </span>
      <span className={`  ${color ? color : "dark:text-white"} text-right `}>
        {value}
      </span>
    </div>
  );
};

export const useToFixedMethode = () => {
  const { data: tokenList } = useTokenList();

  const toFixedValue = (value: any, symbol: string) => {
    const matchSymbol = tokenList?.find(
      (item: any) => item?.supportedCurrency?.symbol === symbol
    );

    const decimalPlaces = matchSymbol?.supportedCurrency?.decimal_places ?? 2;
    const num = Number(value);

    return isNaN(num) ? "0" : num.toFixed(decimalPlaces);
  };

  return { toFixedValue };
};



export function DateTimeFormates(inputDate: string) {
  return inputDate ? moment(inputDate).format("DD/MM/YYYY hh:mm A") : "--";
}



export function OldNewUserTag(userTag: any) {
  return userTag !== null && userTag !== undefined && userTag ? "New User" : userTag !== null && userTag !== undefined && !userTag ? "Old User" : "--";
}

export function TestRealUserType(userType: any) {
  return userType !== null && userType !== undefined && userType ? "Test User" : userType !== null && userType !== undefined && !userType ? "Real User" : "--";
}




export const statusText = (type: string) => {
  switch (type) {
    case "VERIFIED":
      return "Verified";

    case "verified":
      return "Verified";

    case "confirmed":
      return "Verified";

    case "Accepted":
      return "Verified";

    case "Approved":
      return "Approved";

    case "APPROVED":
      return "Approved";

    case "ACTIVE":
      return "Active";

    case "INACTIVE":
      return "Inactive";

    case "REJECTED":
      return "Rejected";

    case "rejected":
      return "Rejected";

    case "Rejected":
      return "Rejected";

    case "DELETE":
      return "Deleted";

    case "BLOCK":
      return "Blocked";

    case "IN-PROCESS":
      return "Pending";

    case "PENDING":
      return "Pending";

    case "inProcess":
      return "Pending";

    case "pending":
      return "Pending";

    case "PAID":
      return "Paid";

    case "TERMINATE":
      return "Terminated";

    case "COMPLETED":
      return "Completed";

    case "buy":
      return "Buy";

    case "Buy":
      return "Buy";

    case "BUY":
      return "BUY";

    case "sell":
      return "Sell";

    case "Sell":
      return "Sell";

    case "SELL":
      return "Sell";

    case "Cancled":
      return "Cancled";

    case "Completed":
      return "Completed";

    case "Cancel":
      return "Cancel";

    case "released":
      return "Released";

    default:
      return type;
  }


};

export const statusColor = (type: string) => {
  switch (type) {
    case "VERIFIED":
      return "text-green-500";


    case "verified":
      return "text-green-500";

    case "Verified":
      return "text-green-500";

    case "confirmed":
      return "text-green-500";

    case "Accepted":
      return "text-green-500";

    case "Approved":
      return "text-green-500";

    case "APPROVED":
      return "text-green-500";

    case "Completed":
      return "text-green-500";

    case "ACTIVE":
      return "text-green-500";

    case "Active":
      return "text-green-500";

    case "Inactive":
      return "text-red-500";

    case "PAID":
      return "text-green-500";

    case "COMPLETED":
      return "text-green-500";

    case "REJECTED":
      return "text-red-500";

    case "rejected":
      return "text-red-500";

    case "Rejected":
      return "text-red-500";

    case "DELETE":
      return "text-red-500";

    case "BLOCK":
      return "text-red-500";

    case "TERMINATE":
      return "text-red-500";

    case "IN-PROCESS":
      return "text-yellow-500";

    case "inProcess":
      return "text-yellow-500";

    case "PENDING":
      return "text-yellow-500";

    case "pending":
      return "text-yellow-500";

    case "Pending":
      return "text-yellow-500";

    case "INACTIVE":
      return "text-red-500";

    case "buy":
      return "text-green-500";

    case "Buy":
      return "text-green-500";

    case "BUY":
      return "text-green-500";

    case "sell":
      return "text-red-500";

    case "Sell":
      return "text-red-500";

    case "SELL":
      return "text-red-500";

    case "Cancled":
      return "text-red-500";

    case "Success":
      return "text-green-500";

    case "Cancel":
      return "text-red-500";

    case "released":
      return "text-green-500";

    default:
      return "";
  }
};

export const FormateText = (type: string) => {
  switch (type) {
    case "KYC_Reward":
      return "KYC Reward";

    case "Deposit_Reward":
      return "Deposit Reward";

    case "Trade_Reward":
      return "Trade Reward";

    case "Deposit_Cashback_Reward":
      return "Deposit Cashback Reward";

    case "KYC_Referral":
      return "KYC Referral";

    case "Deposit_Referral":
      return "Deposit Referral";

    case "Trade_Referral":
      return "Trade Referral";

    case "Campaign_Reward":
      return "Campaign Reward";

    case "KYC_Campaign_Reward":
      return "KYC Referral Reward";

    case "Deposit_Campaign_Reward":
      return "Deposit Referral Reward";

    case "Trade_Campaign_Reward":
      return "Trade Referral Reward";

    case "Nowory11_Campaign_Reward":
      return "Nowory11 Referral Reward";

    case "miningFAQ":
      return "Mining FAQ";

    case "refer&EarnFAQ":
      return "Refer & Earn FAQ";

    case "cryptoDepositFAQ":
      return "Crypto Deposit FAQ";

    case "noworyDealFAQ":
      return "Nowory Deal FAQ";

    case "inrDepositFAQ":
      return "INR Deposit FAQ";

    case "nowory11FAQ":
      return "Nowory11 FAQ";

    case "inrWithdrowFAQ":
      return "INR Withdraw FAQ";

    case "Nowory11_Reward":
      return "Nowory11 Reward";

    case "noworyDropFAQ":
      return "Nowory Drop FAQ";

    case "deal&DropFAQ":
      return "Deal & Drop FAQ";
    case "Deposit_Crypto_Cashback":
      return "Deposit Crypto Cashback";

    case "Nowory11DepositFAQ":
      return "Nowory11 Deposit FAQ";

    case "Nowory11_Referral":
      return "Nowory11 Referral";

    case "ALL":
      return "All";

    case "CRYPT":
      return "Crypto";

    case "FIAT":
      return "INR";

    case "WITHWROW_LIMIT":
      return "Withdrawal Amount";

    case "rapidToken":
      return "Rapid Token";

    case "platformToken":
      return "Platform Token";

    case "app":
      return "App";

    case "webite":
      return "Website";


    default:
      return type;
  }
};


export const PayloadText = {
  USDTPriceSetting: (type: string) => {
    switch (type) {
      case "Fixed":
        return "fixed";
      case "Percent":
        return "percent";
      default:
        return type;
    }
  },

  UserAllFund: (type: string) => {
    switch (type) {
      case "Deposit Top":
        return "depositTOP";

      case "Deposit Down":
        return "depositDOWN";

      case "Fund Top":
        return "fundTOP";

      case "Fund Down":
        return "fundDOWN";

      case "Withdraw Top":
        return "withdrawTOP";

      case "Withdraw Down":
        return "withdrawDOWN";

      default:
        return type;
    }
  },

  BalanceLog: (type: string) => {
    switch (type) {
      case "Blocked":
        return "BLOCK";

      case "Active":
        return "ACTIVE";

      case "Deleted":
        return "DELETE";

      default:
        return type;
    }
  },

  ViewOverAllFunds: (type: string) => {
    switch (type) {
      case "Top":
        return "TOP";

      case "Down":
        return "DOWN";

      default:
        return type;
    }
  },


  UserFundDetails: (type: string) => {
    switch (type) {
      case "Top":
        return "TOP";

      case "Down":
        return "DOWN";

      default:
        return type;
    }
  },
  OverAllFundFreeze: (type: string) => {
    switch (type) {
      case "All":
        return "ALL";

      case "Crypto":
        return "CRYPT";

      case "INR":
        return "FIAT";
      default:
        return type;
    }
  },

  TradeActivityDetails: (type: string) => {
    switch (type) {
      case "Buy":
        return "buy";

      case "Sell":
        return "sell";
      default:
        return type;
    }
  },

  OverAllFunds: (type: string) => {
    switch (type) {
      case "Old User":
        return false;

      case "New User":
        return true;
      default:
        return type;
    }
  },

  UserList: (type: string) => {
    switch (type) {
      case "New User":
        return "true";

      case "Old User":
        return "false";

      default:
        return type;
    }
  },
  Nowory11InvitedUser: (type: string) => {
    switch (type) {
      case "New User":
        return "new";

      case "Old User":
        return "old";

      default:
        return type;
    }
  },

  UserTag: (type: string) => {
    switch (type) {
      case "Old User":
        return false;

      case "New User":
        return true;

      default:
        return type;
    }
  },

  TicketListGestUser: (type: string) => {
    switch (type) {
      case "Yes":
        return true;

      case "No":
        return false;

      default:
        return type;
    }
  },

  ParticularUserTradeSortType: (type: string) => {
    switch (type) {
      case "Creadit Amount Top":
        return "creditAmountTOP";

      case "Creadit Amount Down":
        return "creditAmountDOWN";

      case "Debit Amount Top":
        return "debitAmountTOP";

      case "Debit Amount Down":
        return "debitAmountDOWN";

      default:
        return type;
    }
  },


  SortTypeAllUserTDS: (type: string) => {
    switch (type) {
      case "Total TDS (INR) Top":
        return "totalTDS_INRTOP";

      case "Total TDS (INR) Down":
        return "totalTDS_INRDOWN";

      case "Total TDS (USDT) Top":
        return "totalTDS_USDTTOP";

      case "Total TDS (USDT) Down":
        return "totalTDS_USDTDOWN";

      default:
        return type;
    }
  },


  UserType: (type: string) => {
    switch (type) {
      case "Test User":
        return true;

      case "Real User":
        return false;

      default:
        return type;
    }
  },


  DepositCryptoCSVDepositStatus: (type: string) => {
    switch (type) {
      case "Verified":
        return "confirmed";

      default:
        return type;
    }
  },

  WithdrawCryptoCSVStatus: (type: string) => {
    switch (type) {
      case "Pending":
        return "inProcess";

      case "Verified":
        return "confirmed";

      default:
        return type;
    }

  }




};



