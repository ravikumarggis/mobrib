import React from "react";
import { IoClose } from "react-icons/io5";
interface ImagePreviewModalProps {
  isOpen: boolean;
  onclose: () => void;
  imgeUrl: string | undefined;
  title?: string;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  onclose,
  imgeUrl,
  title,
}) => {
  return (
    <>
      {isOpen && (
        <div className="w-full fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px]">
          <div className="relative w-full max-w-3xl mx-auto bg-white dark:bg-[#101828] rounded-lg shadow-lg p-3.5">
            <div className="w-full flex justify-between items-center px-2">
              <h2 className="w-full text-lg font-extrabold text-center text-black dark:text-white">
                {title || " Image Preview"}
              </h2>
              <button
                onClick={onclose}
                className="text-black text-2xl leading-none dark:text-white"
                aria-label="Close modal"
              >
                <IoClose size={25} />
              </button>
            </div>

            <div className="p-3 w-full overflow-auto  object-cover">
              <img
                src={imgeUrl}
                alt="Preview"
                className="w-full h-auto max-h-[350px] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreviewModal;
