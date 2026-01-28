import { ChevronDown, Search } from "lucide-react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import DatePicker from "../form/date-picker";
import Button from "../ui/button/Button";
import { Fragment, memo, useState } from "react";
import Label from "../form/Label";
import { useNavigate } from "react-router";

const status = [
  { id: 1, name: "Verified" },
  { id: 2, name: "Rejected" },
  { id: 3, name: "Pending" },
];
const userType = [
  { id: 1, name: "User" },
  { id: 2, name: "Buddy" },
  { id: 2, name: "Admin" },
];

interface TableFilterProps {
  filter: any;
  setFilter: any;
  type: string;
  walletType: string;
  isLoading: any;
  downloadCSV: any;
  removeParamFn: any;
  filterData: any;
  setIsDownloadCsv: any;
}

const TableFilter: React.FC<TableFilterProps> = ({
  filter,
  setFilter,
  type,

  removeParamFn,
}) => {
  const [datePickerKey, setDatePickerKey] = useState(0);

  const navigate = useNavigate();

  const parseDate = (str: string) => {
    const [day, month, year] = str.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  return (
    <>
      <div className="w-full mb-4 p-0 grid grid-cols-8 2xl:grid-cols-12 gap-4"></div>

      {type == "withdrawCrypto" && (
        <div className="w-full xl:w-[100%] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid 2xl:grid-cols-5 gap-x-3.5 gap-y-3.5 space-x-3 space-y-3 sm:space-y-0">
          <Fragment>
            <div className="w-full">
              <p className="text-gray-700 dark:text-gray-400">Search</p>
              <div className="relative">
                <button className="absolute -translate-y-1/2 left-4 top-1/2 text-gray-500 dark:text-gray-400">
                  <Search />
                </button>
                <input
                  value={filter?.search ? filter?.search : ""}
                  type="text"
                  placeholder="Search"
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent py-2.5 pl-12 pr-10 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10  dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  onChange={(e) => {
                    setFilter((p: any) => ({
                      ...p,
                      page: 1,
                      search: String(e.target.value),
                    }));
                    removeParamFn();
                  }}
                />
              </div>
            </div>

            <div className="w-full">
              <Listbox
                onChange={(value) => {
                  setFilter((p: any) => ({
                    ...p,
                    page: 1,
                    filter: value?.name,
                  }));
                  removeParamFn();
                }}
                value={filter?.filter}
              >
                <Label>Status</Label>
                <ListboxButton className="rounded-lg border border-gray-200 dark:border-gray-800 text-sm flex items-center justify-between w-full px-2 py-2.5 text-gray-400 dark:text-white/30">
                  <p>{filter?.filter || "Status"}</p>
                  <ChevronDown />
                </ListboxButton>
                <ListboxOptions
                  anchor="bottom start"
                  className="bg-blue-400 rounded-lg"
                >
                  {status.map((type) => (
                    <ListboxOption
                      key={type.id}
                      value={type}
                      className=" data-[focus]:bg-blue-100 cursor-pointer flex items-center justify-between w-full px-2 py-2.5 dark:bg-black bg-white text-gray-400 dark:text-white/30 min-w-32"
                    >
                      {type.name}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>

            <div className="w-full">
              <DatePicker
                id="from-date-picker"
                label="From Date"
                placeholder="DD/MM/YYYY"
                key={`from-${datePickerKey}`}
                defaultDate={filter.fromDate}
                maxDate={filter.toDate ? filter.toDate : undefined}
                onChange={(_, dateStr) => {
                  if (
                    filter.toDate &&
                    parseDate(dateStr) > parseDate(filter.toDate)
                  ) {
                    setFilter((p: any) => ({
                      ...p,
                      page: 1,
                      fromDate: dateStr,
                      toDate: undefined,
                    }));
                  } else {
                    setFilter((p: any) => ({
                      ...p,
                      page: 1,
                      fromDate: dateStr,
                    }));
                  }
                  removeParamFn();
                }}
              />
            </div>

            <div className="w-full">
              <DatePicker
                id="to-date-picker"
                label="To Date"
                placeholder="DD/MM/YYYY"
                key={`to-${datePickerKey}`}
                defaultDate={filter.toDate}
                minDate={filter.fromDate ? filter.fromDate : undefined}
                onChange={(_, dateStr) => {
                  if (
                    filter.fromDate &&
                    parseDate(dateStr) < parseDate(filter.fromDate)
                  ) {
                    setFilter((p: any) => ({
                      ...p,
                      page: 1,
                      toDate: dateStr,
                      fromDate: undefined,
                    }));
                  } else {
                    setFilter((p: any) => ({ ...p, page: 1, toDate: dateStr }));
                  }
                  removeParamFn();
                }}
              />
            </div>

            <div className=" w-full flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-3">
              <div className="w-full sm:min-w-40 flex items-end mt-4">
                <Button
                  className="w-full py-3"
                  onClick={() => {
                    setDatePickerKey((p) => p + 1);
                    setFilter({});
                    removeParamFn();
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </Fragment>
        </div>
      )}
      {type == "userList" && (
        <div className="w-full xl:w-[100%] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid 2xl:grid-cols-5 gap-x-3.5 gap-y-3.5 space-x-3 space-y-3 sm:space-y-0">
          <Fragment>
            <div className="w-full">
              <p className="text-gray-700 dark:text-gray-400">Search</p>
              <div className="relative">
                <button className="absolute -translate-y-1/2 left-4 top-1/2 text-gray-500 dark:text-gray-400">
                  <Search />
                </button>
                <input
                  value={filter?.search ? filter?.search : ""}
                  type="text"
                  placeholder="Search by name, email, user Id"
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent py-2.5 pl-12 pr-10 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10  dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  onChange={(e) => {
                    setFilter((p: any) => ({
                      ...p,
                      page: 1,
                      search: String(e.target.value),
                    }));
                    removeParamFn();
                  }}
                />
              </div>
            </div>

            <div className="w-full">
              <Listbox
                onChange={(value) => {
                  setFilter((p: any) => ({
                    ...p,
                    page: 1,
                    filter: value?.name,
                  }));
                  removeParamFn();
                }}
                value={filter?.filter}
              >
                <Label>User Type</Label>
                <ListboxButton className="rounded-lg border border-gray-200 dark:border-gray-800 text-sm flex items-center justify-between w-full px-2 py-2.5 text-gray-400 dark:text-white/30">
                  <p>{filter?.filter || "User Type"}</p>
                  <ChevronDown />
                </ListboxButton>
                <ListboxOptions
                  anchor="bottom start"
                  className="bg-blue-400 rounded-lg"
                >
                  {userType.map((type) => (
                    <ListboxOption
                      key={type.id}
                      value={type}
                      className=" data-[focus]:bg-blue-100 cursor-pointer flex items-center justify-between w-full px-2 py-2.5 dark:bg-black bg-white text-gray-400 dark:text-white/30 min-w-32"
                    >
                      {type.name}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>

            <div className=" w-full flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-3">
              <div className="w-full sm:min-w-40 flex items-end mt-4">
                <Button
                  className="w-full py-3"
                  onClick={() => {
                    setDatePickerKey((p) => p + 1);
                    setFilter({});
                    removeParamFn();
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </Fragment>
        </div>
      )}
      {type == "CategoryList" && (
        <div className="w-full ">
          <div className="flex  justify-end items-end  ">
            <Button
              className=" py-3"
              onClick={() => {
                navigate("/add-category");
              }}
            >
              Add Cetegory
            </Button>
          </div>
        </div>
      )}
      <div className="w-full mb-4 p-0 grid grid-cols-8 2xl:grid-cols-12 gap-4"></div>
    </>
  );
};

export default memo(TableFilter);
