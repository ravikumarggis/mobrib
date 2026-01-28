import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

type MonthData = {
  month: number;
  percentage: number;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: MonthData[];
}

const RedemptionBonusesModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Early Redemption Percentage
          </h2>
          <button onClick={onClose} className="text-gray-600 dark:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="text-sm capitalize">
              <tr>
                <th className="px-4 py-2">Installment No.</th>
                <th className="px-4 py-2">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-t dark:border-gray-600">
                  <td className="px-4 py-2">{item.month}</td>
                  <td className="px-4 py-2">{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RedemptionBonusesModal;
