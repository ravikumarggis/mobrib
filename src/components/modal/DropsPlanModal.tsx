import moment from "moment";
import React from "react";
import { IoClose } from "react-icons/io5";
import { DateTimeFormates, statusColor, statusText } from "../../utils";
interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedData?: any;
  text: string;
  count: any;
}
const DropsPlanModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  selectedData,
  text,
  count,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/50 xl:pb-[150px] px-2">
      <div
        className={`relative w-full ${count == 3
          ? "max-w-[85%]"
          : count == 2
            ? "max-w-[75%]"
            : count == 1
              ? "max-w-[60%]"
              : "max-w-[30%]"
          } py-6 px-10 sm:px-20 bg-white rounded-lg dark:bg-gray-800 shadow-md`}
      >
        <button
          className="absolute top-2 right-2 text-xl font-bold text-black"
          onClick={onClose}
        >
          <IoClose className="text-gray-900 dark:text-white" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          {/* {text} */}
          Details
        </h2>

        {/* <div className="w-full flex justify-between lg:flex-row flex-col lg:space-x-3 space-y-3 lg:space-y-0 dark:text-white"> */}
        <div
          className={` grid w-full gap-3 dark:text-white ${count === 1
            ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
            : count === 2
              ? "grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
              : count === 3
                ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1"
            } `}
        >
          {selectedData?.depositData && (
            <div className="border w-full rounded-md p-2 flex flex-col space-y-2 ">
              <h2 className="text-center border-b -mx-2 py-1 text-lg font-semibold">
                Deposit Details
              </h2>
              <div className="flex justify-between items-center">
                <span>Deposit Amount:</span>
                <span>{selectedData?.depositData?.amount || "--"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Symbol:</span>
                <span>{selectedData?.depositData?.symbol || "--"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Transaction Id:</span>
                <span>{selectedData?.depositData?.transection_id || "--"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Deposit Date:</span>
                <span>
                  {selectedData?.depositData?.date
                    ?
                    DateTimeFormates(selectedData?.depositData?.date)
                    // moment(selectedData?.depositData?.date).format("lll")
                    : "--"}{" "}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Status:</span>
                <span
                  className={
                    selectedData?.isDeposit ? `text-green-500` : "text-red-500"
                  }
                >
                  {selectedData?.isDeposit ? "Success" : "Not Success"}
                </span>
              </div>
            </div>
          )}

          {selectedData?.tradeData && (
            <div className="border w-full rounded-md p-2 flex flex-col space-y-2 ">
              <h2 className="text-center border-b -mx-2 py-1 text-lg font-semibold">
                Trade Details
              </h2>
              <div className="flex justify-between items-center">
                <span>Order Type:</span>
                <span
                  className={`${statusColor(
                    selectedData?.tradeData?.orderType
                  )}`}
                >
                  {" "}
                  {statusText(selectedData?.tradeData?.orderType) || "--"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Order Value:</span>
                <span>{selectedData?.tradeData?.debitAmount || "--"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Trade Symbol:</span>
                <span>{selectedData?.tradeData?.debitCurrency || "--"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Credit Amount:</span>
                <span>{selectedData?.tradeData?.creditAmount || "--"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Credit Symbol:</span>
                <span>{selectedData?.tradeData?.creditCurrency || "--"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Trade Id:</span>
                <span>{selectedData?.tradeData?.trade_id || "--"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Date:</span>
                <span>
                  {selectedData?.tradeData?.date
                    ?
                    DateTimeFormates(selectedData?.tradeData?.date)


                    // moment(selectedData?.tradeData?.date).format("lll")

                    : "--"}{" "}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Status:</span>
                <span
                  className={
                    selectedData?.isTrade ? `text-green-500` : "text-red-500"
                  }
                >
                  {selectedData?.isTrade ? "Success" : "Not Success"}
                </span>
              </div>
            </div>
          )}

          {selectedData?.nowory11Data && (
            <div className="border w-full rounded-md p-2 flex flex-col space-y-2 ">
              <h2 className="text-center border-b -mx-2 py-1 text-lg font-semibold">
                Nowory11 Details
              </h2>
              <div className="flex justify-between items-center">
                <span>Amount:</span>
                <span>{selectedData?.nowory11Data?.amount || "--"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Symbol:</span>
                <span>{selectedData?.nowory11Data?.symbol || "--"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Transaction Id:</span>
                <span>
                  {selectedData?.nowory11Data?.transection_id || "--"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Date:</span>
                <span>
                  {selectedData?.nowory11Data?.date
                    ?
                    DateTimeFormates(selectedData?.nowory11Data?.date)

                    // moment(selectedData?.nowory11Data?.date).format("lll")
                    : "--"}{" "}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Plan Symbol:</span>
                <span>{selectedData?.nowory11Data?.plansymbol || "--"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Status:</span>
                <span
                  className={
                    selectedData?.isNowory11 ? `text-green-500` : "text-red-500"
                  }
                >
                  {selectedData?.isNowory11 ? "Success" : "Not Success"}
                </span>
              </div>
            </div>
          )}

          {/* {selectedData?.nowory11Data &&
                        <div className="border w-full rounded-md p-2 flex flex-col space-y-2 ">
                            <h2 className="text-center border-b -mx-2 py-1 text-lg font-semibold">
                                Nowory11 Details
                            </h2>
                            <div className="flex justify-between items-center">
                                <span>Amount:</span>
                                <span>{selectedData?.nowory11Data?.amount || "--"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Date:</span>
                                <span>
                                    {selectedData?.nowory11Data?.date
                                        ? moment(selectedData?.commitDate).format("lll")
                                        : "--"}{" "}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span>Transaction Id:</span>
                                <span>{selectedData?.nowory11Data?.transection_id || "--"}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span>Pay Symbol:</span>
                                <span>{selectedData?.nowory11Data?.paySymbol || "--"}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span>Plan Symbol:</span>
                                <span>{selectedData?.nowory11Data?.plansymbol || "--"}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span>Status:</span>
                                <span
                                    className={
                                        selectedData?.isNowory11 ? `text-green-500` : "text-red-500"
                                    }
                                >
                                    {selectedData?.isNowory11 ? "Success" : "Not Success"}
                                </span>
                            </div>
                        </div>
                    } */}

          <div className="border w-full rounded-md p-2 flex flex-col space-y-2 ">
            <h2 className="text-center border-b -mx-2 py-1 text-lg font-semibold">
              Commit Details
            </h2>
            <div className="flex justify-between items-center">
              <span>Commit Amount:</span>
              <span>{selectedData?.commitAmount || "--"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Commit Symbol:</span>
              <span>INR</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Commit Id:</span>
              <span>{selectedData?.commitId || "--"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Commit Date:</span>
              <span>
                {selectedData?.commitDate
                  ?
                  DateTimeFormates(selectedData?.commitDate)

                  // moment(selectedData?.commitDate).format("lll")
                  : "--"}{" "}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Status:</span>
              <span
                className={
                  selectedData?.isCommit ? `text-green-500` : "text-red-500"
                }
              >
                {selectedData?.isCommit ? "Success" : "Not Success"}
              </span>
            </div>

            {Number(selectedData?.refundAmount) > 0 &&
              selectedData?.SubStatus === "Cancled" && (
                <>
                  <div className="flex justify-between items-center">
                    <span>Refunded Amount:</span>
                    <span>{`${selectedData?.refundAmount} INR` || "--"}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Refund Date:</span>
                    <span>
                      {selectedData?.noworyDropPlan?.endDate
                        ?
                        DateTimeFormates(selectedData?.noworyDropPlan?.endDate)


                        // moment(selectedData?.noworyDropPlan?.endDate).format(
                        //   "lll"
                        // )


                        : "--"}{" "}
                    </span>
                  </div>
                </>
              )}

            {Number(selectedData?.allocateQty) > 0 &&
              selectedData?.isQtyAllocate && (
                <>
                  <div className="flex justify-between items-center">
                    <span>Allocated Qty :</span>
                    <span>
                      {`${selectedData?.allocateQty} ${selectedData?.noworyDropPlan?.symbol}` ||
                        "--"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Allocated Date :</span>
                    <span>
                      {selectedData?.noworyDropPlan?.allocationDate
                        ?
                        DateTimeFormates(selectedData?.noworyDropPlan?.allocationDate)


                        // moment(
                        //   selectedData?.noworyDropPlan?.allocationDate
                        // ).format("lll")


                        : "--"}{" "}
                    </span>
                  </div>
                </>
              )}

            {selectedData?.isCommitAllocate && (
              <>
                <div className="flex justify-between items-center">
                  <span>Refunded Amount:</span>
                  <span>{`${selectedData?.refundAmount} INR` || "--"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Refunded Date :</span>
                  <span>
                    {selectedData?.noworyDropPlan?.RefundDate
                      ?
                      DateTimeFormates(selectedData?.noworyDropPlan?.RefundDate)


                      // moment(selectedData?.noworyDropPlan?.RefundDate).format(
                      //   "lll"
                      // )
                      : "--"}{" "}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropsPlanModal;
