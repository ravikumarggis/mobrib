import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  btnTextClose?: string;
  btnTextConfirm?: string;
  showDeleteIcon: boolean;
  lable: string;
  TextMessage: string;
  setIsTextMessage: (value: string) => void;
  VerifyOrRejected: string;
  placeholderText: string;
  errorText: string;
  showTextArea: boolean;
}

/* Status constants */
const APPROVE_STATUSES = [
  "Approved",
  "Approve",
  "Verify",
  "Verified",
  "Accepted",
  "approved",
  "VERIFIED",
  "verified",
  "Delete",
];

const REJECT_STATUSES = [
  "Rejected",
  "Reject",
  "rejected",
  "REJECTED",
];

const DynamicConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure?",
  btnTextClose = "No, cancel",
  btnTextConfirm = "Yes, I'm sure",
  showDeleteIcon,
  lable,
  TextMessage,
  setIsTextMessage,
  VerifyOrRejected,
  placeholderText = "Enter text...",
  errorText,
  showTextArea,
}) => {
  if (!isOpen) return null;

  const isReject = REJECT_STATUSES.includes(VerifyOrRejected);
  const isApprove = APPROVE_STATUSES.includes(VerifyOrRejected);

  /** Disable confirm button logic */
  const isConfirmDisabled =
    showTextArea && !TextMessage.trim();

  /** Handle confirm safely */
  const handleConfirm = () => {
    if (isConfirmDisabled) return;
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative p-4 w-full max-w-md">
        <div className="relative p-5 text-center bg-white rounded-lg shadow dark:bg-gray-800">
          
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-900"
          >
            ✕
          </button>

          {/* Optional delete icon */}
          {showDeleteIcon && (
            <div className="text-gray-400 text-4xl mb-3">🗑️</div>
          )}

          <p className="mb-4 text-gray-500 dark:text-gray-300">
            {message}
          </p>

          {/* Text Area */}
          {showTextArea && (
            <div className="mb-3 text-left">
              <label className="block mb-1 text-sm text-gray-900 dark:text-white">
                {lable || "Your message"}
              </label>

              <textarea
                rows={4}
                value={TextMessage}
                onChange={(e) => setIsTextMessage(e.target.value)}
                placeholder={placeholderText}
                className="w-full p-2.5 text-sm border rounded-lg dark:bg-gray-700 dark:text-white"
              />

              {isConfirmDisabled && (
                <p className="text-red-500 text-sm mt-1">
                  {errorText}
                </p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm border rounded-lg"
            >
              {btnTextClose}
            </button>

            <button
              disabled={isConfirmDisabled}
              onClick={handleConfirm}
              className={`px-6 py-2 text-sm text-white rounded-lg
                ${
                  isConfirmDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : isReject
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }
              `}
            >
              {btnTextConfirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicConfirmModal;
