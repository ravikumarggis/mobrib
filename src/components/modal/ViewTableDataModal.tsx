import React from "react";
import moment from "moment";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  userData: Record<string, any>;
  title?: string;
  formatters?: Record<string, (val: any) => string>;
};

const ViewTableDataModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userData,
  title = "Details",
  formatters = {},
}) => {
  if (!isOpen || !userData) return null;
  // const keys = Object.keys(userData);

  return (
    <div className="inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs absolute bg-black/50">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-[95%] xl:max-w-[80%]  px-1 py-4 sm:p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-black dark:text-white"
        >
          ✕
        </button>

        <h2 className="text-center text-base md:text-lg font-semibold mb-4 dark:text-white text-gray-900">
          {title}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-collapse">
            <thead>
              <tr>
                {/* {keys.map((key) => ( */}

                <th
                  // key={key}
                  className="border px-4 py-2 whitespace-nowrap text-left font-semibold text-gray-900 dark:text-white capitalize"
                >
                  Account Number
                </th>
                <th
                  // key={key}
                  className="border px-4 py-2 whitespace-nowrap text-left font-semibold text-gray-900 dark:text-white capitalize"
                >
                  Bank Name
                </th>
                {/* <th
                  // key={key}
                  className="border px-4 py-2 whitespace-nowrap text-left font-semibold text-gray-900 dark:text-white capitalize"
                >
                  Account Type
                </th> */}
                <th
                  // key={key}
                  className="border px-4 py-2 whitespace-nowrap text-left font-semibold text-gray-900 dark:text-white capitalize"
                >
                  Account Holder Name
                </th>
                <th
                  // key={key}
                  className="border px-4 py-2 whitespace-nowrap text-left font-semibold text-gray-900 dark:text-white capitalize"
                >
                  IFSC Code
                </th>
                <th
                  // key={key}
                  className="border px-4 py-2 whitespace-nowrap text-left font-semibold text-gray-900 dark:text-white capitalize"
                >
                  Mobile
                </th>
                <th
                  // key={key}
                  className="border px-4 py-2 whitespace-nowrap text-left font-semibold text-gray-900 dark:text-white capitalize"
                >
                  Date/Time
                </th>
                <th className="border px-4 py-2 whitespace-nowrap text-left font-semibold text-gray-900 dark:text-white capitalize">
                  status
                </th>
                {/* <th className="border px-4 py-2 whitespace-nowrap text-left font-semibold text-gray-900 dark:text-white capitalize">
                  default Bank
                </th> */}
                {/* ))} */}
              </tr>
            </thead>
            {userData?.map((data: any) => {
              return (
                <>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-800 text-sm sm:text-base text-gray-900 dark:text-white">
                      <td className="border px-4 py-2 whitespace-nowrap">
                        {data.accountNumber}
                      </td>
                      <td className="border px-4 py-2 whitespace-nowrap">
                        {data.bankName}
                      </td>
                      {/* <td className="border px-4 py-2 whitespace-nowrap">
                        {data.accountType}
                      </td> */}
                      <td className="border px-4 py-2 whitespace-nowrap">
                        {data?.beneName}
                      </td>
                      <td className="border px-4 py-2 whitespace-nowrap">
                        {data.ifscCode}
                      </td>
                      <td className="border px-4 py-2 whitespace-nowrap">
                        {data?.mobileNumber || "--"}
                      </td>
                      <td className="border px-4 py-2 whitespace-nowrap">
                        {moment(data?.createdAt)?.format("llll")}
                      </td>
                      <td className="border px-4 py-2 whitespace-nowrap">
                        {data.status}
                      </td>
                      {/* <td className="border px-4 py-2 whitespace-nowrap">
                        {data.isPrimaryAccount ? "Yes" : "No"}
                      </td> */}
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewTableDataModal;
