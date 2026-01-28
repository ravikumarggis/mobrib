import moment from "moment";
import React from "react";
import { DateTimeFormates } from "../../utils";
type BankAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
};

const BankAccountModal: React.FC<BankAccountModalProps> = ({
  isOpen,
  onClose,
  userData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs absolute bg-black/50 min-h-screen">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-[98%] lg:max-w-[70%] px-1 py-4 sm:p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-black   dark:text-white"
        >
          ✕
        </button>

        <h2 className="text-center text-base md:text-lg font-semibold mb-4 dark:text-white text-gray-900">
          Admin Bank Account Details
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-collapse ">
            <thead>
              <tr>
                {[
                  "Bank Name",
                  "Account Number",
                  "Account Type",
                  "Account Holder Name",
                  "IFSC Code",
                  "Date & Time",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border px-4 py-2 whitespace-nowrap text-left font-semibold  text-gray-900 dark:text-white"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white dark:bg-gray-800 text-sm sm:text-base  text-gray-900 dark:text-white">
                {/* <td className="border px-4 py-2 whitespace-nowrap hover:underline cursor-pointer">
                  Tarality Venture
                </td> */}
                <td className="border px-4 py-2 whitespace-nowrap">
                  {userData?.accountName}
                </td>
                <td className="border px-4 py-2 whitespace-nowrap">
                  {userData?.virtualAccount}
                </td>

                <td className="border px-4 py-2 whitespace-nowrap capitalize">
                  {userData?.accountType}
                </td>

                <td className="border px-4 py-2 whitespace-nowrap">
                  {userData?.benifieryName}
                </td>
                <td className="border px-4 py-2 whitespace-nowrap">
                  {userData?.ifsc}
                </td>
                <td className="border px-4 py-2 whitespace-nowrap">
                  {
                    DateTimeFormates(userData?.updatedAt)
                  }
                  {/* {moment(userData?.updatedAt).format("LLL")} */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BankAccountModal;
