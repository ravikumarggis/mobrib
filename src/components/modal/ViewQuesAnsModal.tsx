import React from "react";
import { IoClose } from "react-icons/io5";
import Label from "../form/Label";
import TextArea from "../form/input/TextArea";

interface ViewQuesAnsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  selectedData: any;
}

const ViewQuesAnsModal: React.FC<ViewQuesAnsModalProps> = ({
  isOpen,
  onClose,
  title,
  selectedData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/50 xl:pb-[150px] px-2">
      <div className="relative w-full max-w-2xl py-6 px-10 sm:px-20 bg-white rounded-lg dark:bg-gray-800 shadow-md">
        <button
          className="absolute top-2 right-2 text-xl font-bold text-black"
          onClick={onClose}
        >
          <IoClose className="text-gray-900 dark:text-white" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          {title}
        </h2>

        {selectedData?.question && (
          <div className="w-full">
            <Label>Question</Label>
            <TextArea value={selectedData?.question} />
          </div>
        )}
        {selectedData?.message && (
          <div className="w-full">
            <Label>User Feedback</Label>
            <TextArea value={selectedData?.message} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewQuesAnsModal;
