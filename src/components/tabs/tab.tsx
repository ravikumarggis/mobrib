import React from "react";

type TabButtonProps = {
  setFilter: any;
  filter: any;
  item: {
    name: string;
  };
};

const TabButton: React.FC<TabButtonProps> = ({ setFilter, filter, item }) => {
  return (
    <button
      onClick={() => {
        setFilter((p: any) => ({
          ...p,
          page: 1,
          ModuleType: item?.name,
        }));
      }}
      className={`w-full whitespace-nowrap px-5 py-2 ${
        filter?.ModuleType == item?.name
          ? "border border-blue-500  text-blue-600 dark:text-white"
          : "border border-gray-300  text-gray-600 dark:text-white"
      } rounded-md font-medium
                     bg-white dark:bg-transparent`}
    >
      {item?.name}
    </button>
  );
};
export default TabButton;
