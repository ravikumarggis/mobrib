import { BoxIconLine } from "../../icons";
import {
  useGetTotalDepsitWithdrawalCount,
  useGetTotaluserCount,
  useTotalDetails,
} from "../../queries/dashboard";
import { useTicketsList } from "../../queries/tickets";

export default function EcommerceMetrics() {
  const { data } = useGetTotaluserCount();
  const { data: depositWithdrawalData } = useGetTotalDepsitWithdrawalCount();
  const { data: totaldetails } = useTotalDetails();
  const { data: ticketDetails } = useTicketsList();

  console.log(depositWithdrawalData, "depositWithdrawalData>>>>>>>>>>>>>>>>>>>>>>>>>>>")

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-[1.5fr_1fr_1fr]  place-items-center gap-5">
        <div className=" rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 w-full">
          <div className="flex justify-start items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <h1 className="text-xl font-bold dark:text-white">All Users</h1>
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total User
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {data?.totolUser || "0"}
              </h4>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending KYC
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {data?.TotalPendingKyc || "0"}
              </h4>
            </div>

            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Verified KYC
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {data?.totalVerifyKyc || "0"}
              </h4>
            </div>

            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Deleted User
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {data?.totalDeleteUser || "0"}
              </h4>
            </div>

            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Active User In 1H
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {data?.last1hourActiveUser || "0"}
              </h4>
            </div>
          </div>
        </div>
        <div className=" rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 w-full">
          <div className="flex justify-start items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <h1 className="text-xl font-bold dark:text-white">
              INR Deposit Requests
            </h1>
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.pendingInrDeposit || "0"}
              </h4>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Rejected
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.rejectedInrDeposit || "0"}
              </h4>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Verified
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.verifiedInrDeposit || "0"}
              </h4>
            </div>
          </div>
        </div>{" "}
        <div className=" rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 w-full">
          <div className="flex justify-start items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <h1 className="text-xl font-bold dark:text-white">
              INR Withdrawal Requests
            </h1>
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.pendingInrWithdraw || "0"}
              </h4>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Rejected
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.rejectedInrWithdraw || "0"}
              </h4>
            </div>

            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Verified
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.verifiedInrWithdraw || "0"}
              </h4>
            </div>
          </div>
        </div>{" "}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-[1.1fr_1.2fr_1fr]  place-items-center gap-5 mt-3.5">
        <div className=" rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 w-full">
          <div className="flex justify-start items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <h1 className="text-xl font-bold dark:text-white">
              Crypto Deposit Requests
            </h1>
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.pendingCryptoDeposit || "0"}
              </h4>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Rejected
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.rejectedCryptoDeposit || "0"}
              </h4>
            </div>

            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Verified
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.verifiedCryptoDeposit || "0"}
              </h4>
            </div>
          </div>
        </div>{" "}
        <div className=" rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 w-full">
          <div className="flex justify-start items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <h1 className="text-xl font-bold dark:text-white">
              Crypto Withdrawal Requests
            </h1>
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.pendingCryptoWithdraw || "0"}
              </h4>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Rejected
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.rejectedCryptoWithdraw || "0"}
              </h4>
            </div>

            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Verified
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.verifiedCryptoWithdraw || "0"}
              </h4>
            </div>
          </div>
        </div>{" "}
        <div className=" rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 w-full">
          <div className="flex justify-start items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <h1 className="text-xl font-bold dark:text-white">
              Ticket Details
            </h1>
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {ticketDetails?.data?.result?.totalPendingCount || "0"}
              </h4>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                In-Process
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {ticketDetails?.data?.result?.totalInprocessCount || "0"}
              </h4>
            </div>

            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Resolved
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {ticketDetails?.data?.result?.totalResolvedCount || "0"}
              </h4>
            </div>
          </div>
        </div>{" "}


        <div className=" rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 w-full">
          <div className="flex justify-start items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <h1 className="text-xl font-bold dark:text-white">
              Deposit Nowory11 Request
            </h1>
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.pendingNowory11Deposit || "0"}
              </h4>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Verified
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.verifiedNowory11Deposit || "0"}
              </h4>
            </div>

            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Rejected
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.rejectedNowory11Deposit || "0"}
              </h4>
            </div>
          </div>
        </div>

        <div className=" rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 w-full">
          <div className="flex justify-start items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <h1 className="text-xl font-bold dark:text-white">
              Bank Verification Requests
            </h1>
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.pendingBank || "0"}
              </h4>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Rejected
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.rejectedBank || "0"}
              </h4>
            </div>

            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Verified
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm text-center dark:text-white/90">
                {depositWithdrawalData?.verifiedBank || "0"}
              </h4>
            </div>
          </div>
        </div>{" "}
      </div>

      <div className=" rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 w-full min-w-full mt-4">
        <div className="flex justify-start items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <h1 className="text-lg font-medium dark:text-white">
            Total Deposit/Withdraw Fund in (INR)
          </h1>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 mt-4 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Crypto Deposit
            </p>
            <h4 className="mt-2 font-bold text-gray-800 text-xl text-center dark:text-white/90">
              {totaldetails?.result?.totalCryptoDepositsINR || "0"}
            </h4>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400  text-center">
              INR Deposit
            </p>
            <h4 className="mt-2 font-bold text-gray-800 text-xl text-center dark:text-white/90">
              {totaldetails?.result?.totalInrDepositsINR || "0"}
            </h4>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Crypto Withdraw
            </p>
            <h4 className="mt-2 font-bold text-gray-800 text-xl text-center dark:text-white/90">
              {totaldetails?.result?.totalCryptoWithdrawsINR || "0"}
            </h4>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              INR Withdraw
            </p>
            <h4 className="mt-2 font-bold text-gray-800 text-xl text-center dark:text-white/90">
              {totaldetails?.result?.totalInrWithdrawsINR || "0"}
            </h4>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              INR Deposit fee
            </p>
            <h4 className="mt-2 font-bold text-gray-800 text-xl text-center dark:text-white/90">
              {totaldetails?.result?.totalInrDepositFeeINR || "0"}
            </h4>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400  text-center">
              Crypto Withdraw fee
            </p>
            <h4 className="mt-2 font-bold text-gray-800 text-xl text-center dark:text-white/90">
              {totaldetails?.result?.totalCryptoWithdrawFeeINR || "0"}
            </h4>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400  text-center">
              INR Withdraw fee
            </p>
            <h4 className="mt-2 font-bold text-gray-800 text-xl text-center dark:text-white/90">
              {totaldetails?.result?.totalInrWithdrawFeeINR || "0"}
            </h4>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400  text-center">
              Deposit Nowory11
            </p>
            <h4 className="mt-2 font-bold text-gray-800 text-xl text-center dark:text-white/90">
              {totaldetails?.result?.totalNowory11DepositsINR || "0"}
            </h4>
          </div>
        </div>
      </div>


    </>
  );
}
