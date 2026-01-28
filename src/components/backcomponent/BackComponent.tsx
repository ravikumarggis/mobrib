import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";
import useGoBack from "../../hooks/useGoBack";

interface BackComponentProps {
  text: string | any;
  backpageroute?: string;
}

const BackComponent: React.FC<BackComponentProps> = ({
  text,
  backpageroute,
}) => {
  const navigate = useNavigate();
  const goBack = useGoBack();

  const handleBack = () => {
    if (backpageroute) {
      navigate(backpageroute);
    } else {
      goBack();
    }
  };

  return (
    <div className="flex justify-start items-center space-x-0.5 mb-1 sm:mb-0">
      <IoMdArrowRoundBack
        size={30}
        className="font-semibold cursor-pointer text-[#1D2939] dark:text-white"
        onClick={handleBack}
      />
      <p className="text-center hidden sm:block text-lg md:text-xl font-semibold text-[#1D2939] dark:text-white">
        {text}
      </p>
    </div>
  );
};

export default BackComponent;
