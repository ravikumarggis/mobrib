import React from "react";
import CopyButton from "../common/CopyButton";
import moment from "moment";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  data: any;
}

const PepDetailsModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
      <div className="relative p-4 w-full max-w-md">
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 dark:text-white">
          <h1>PEP Details</h1>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 
                  8.586l4.293-4.293a1 1 0 
                  111.414 1.414L11.414 10l4.293 
                  4.293a1 1 0 01-1.414 
                  1.414L10 11.414l-4.293 
                  4.293a1 1 0 01-1.414-1.414L8.586 
                  10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="w-full rounded-sm border px-5  py-2 flex flex-col space-y-1.5 mt-5">
            <div className="flex justify-between items-cente -mr-2">
              <span>Name:</span>
              <span>{data?.name?.map((item: any) => item || "--")}</span>
            </div>

            <div className="flex justify-between items-cente -mr-2">
              <span>Email:</span>
              <span>{data?.email || "--"}</span>
            </div>

            <div className="flex justify-between items-cente -mr-2">
              <span>Gender:</span>
              <span>{data?.gender || "--"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>DOB:</span>
              <span>
                {data?.date_of_birth
                  ? moment(data?.date_of_birth).format("DD/MM/YYYY")
                  : "--"}
              </span>
            </div>
            <div className="flex justify-between items-center -mr-2">
              <span>Birth Of place:</span>
              <span>{data?.birth_place || "--"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Education:</span>
              <span>{data?.education || "--"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Nationality:</span>
              <span>{data?.nationality?.map((item: any) => item) || "--"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Tax Number:</span>
              <span>
                {data?.tax_number?.map((item: any) => item) || "--"}
                <CopyButton
                  textToCopy={data?.tax_number?.map((item: any) => item)}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PepDetailsModal;
