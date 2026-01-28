import React from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { IoClose } from "react-icons/io5";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  text?: string;
  buttontext?: string;
  selectedData: any;
}

const UsdtPriceSettingModal: React.FC<CreateCategoryModalProps> = ({
  isOpen = false,
  onClose,
  text,
  buttontext = "Submit",
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
          {text}
        </h2>

        <div className="w-full">
          <Label>Symbol</Label>
          <Input type="text" name="symbol" id="symbol" value="USDT" />
        </div>

        <div className="w-full mt-2">
          <Label htmlFor="inr_deposit_price">Deposite INR Price</Label>
          <Input
            type="number"
            name="inr_deposit_price"
            id="inr_deposit_price"
            placeholder="Enter deposit amount"
          />
        </div>

        <div className="w-full mt-2">
          <Label htmlFor="inr_withdraw_price">Withdraw INR Price</Label>
          <Input
            type="number"
            name="inr_withdraw_price"
            id="inr_withdraw_price"
            placeholder="Enter withdraw amount"
          />
        </div>

        <div className="w-full mt-2">
          <Label htmlFor="daily_withdraw_limit">Daily withdraw limit</Label>
          <Input
            type="number"
            name="daily_withdraw_limit"
            id="daily_withdraw_limit"
            placeholder="Enter daily withdraw amount"
          />
        </div>

        <div className="w-full mt-2">
          <Label htmlFor="withdraw_tds">Withdraw TDS %</Label>
          <Input
            type="number"
            name="withdraw_tds"
            id="withdraw_tds"
            placeholder="Enter the withdraw tds %"
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button className="w-[40%] sm:w-[30%]">{buttontext}</Button>
        </div>
      </div>
    </div>
  );
};

export default UsdtPriceSettingModal;
