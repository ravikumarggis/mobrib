import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

const CopyButton = ({ textToCopy }: { textToCopy?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (textToCopy) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Copied.");
      }
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button className="btn-copy m-2" onClick={handleCopy}>
      <span>
        {!copied ? (
          <FaRegCopy size={17} />
        ) : (
          <svg
            xmlSpace="preserve"
            style={{}}
            viewBox="0 0 24 24"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            className="cp-check-mark"
          >
            <g>
              <path
                fill="currentColor"
                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
              ></path>
            </g>
          </svg>
        )}
      </span>
    </button>
  );
};

export default CopyButton;
