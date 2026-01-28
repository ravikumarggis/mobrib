import TableFilter from "./TableFilter";
import LoadingScreen from "./LoadingScreen";
import { flexRender } from "@tanstack/react-table";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import DataNotFound from "./DataNotFound";
import { memo, useMemo } from "react";

const CommonTable = ({ tableData }: { tableData: any }) => {
  const {
    filter,
    setFilter,
    isLoading,
    table,
    type,
    totalPage,
    walletType,
    downloadCSV,
    text,
    removeParamFn = () => {},
    setSearchParamsFn = () => {},
    filterData,
    setIsDownloadCsv,
  } = tableData;

  console.log(table, "tabletable");

  const TablePagination = useMemo(() => {
    return (
      totalPage > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          previousLabel="Previous"
          onPageChange={(selectedItem) => {
            setFilter((p) => {
              return {
                ...p,
                page: selectedItem.selected + 1,
              };
            });

            setSearchParamsFn(selectedItem.selected + 1);
          }}
          forcePage={(filter?.page || 1) - 1}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={totalPage}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeLinkClassName="page-link-active"
          previousClassName="page-item"
          previousLinkClassName="prev-next-link"
          nextClassName="page-item"
          nextLinkClassName="prev-next-link"
          breakClassName="page-item"
          breakLinkClassName="break-link"
          disabledLinkClassName="disabled-link"
        />
      )
    );
  }, [totalPage, filter]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {type && (
        <TableFilter
          removeParamFn={removeParamFn}
          downloadCSV={downloadCSV}
          filter={filter}
          setFilter={setFilter}
          type={type}
          walletType={walletType}
          isLoading={isLoading}
          setIsDownloadCsv={setIsDownloadCsv}
          filterData={filterData}
        />
      )}
      <div
        className={`relative flex flex-col w-full ${
          type && totalPage > 1 ? "h-auto" : "max-h-[70vh]"
          // type ? "h-[62vh]" : "h-[82vh]"
          // type ? "max-h-[62vh]" : "max-h-[65vh]"
        } overflow-auto  dark:bg-black bg-white shadow-md rounded-xl border border-gray-300  dark:border-gray-700 bg-clip-border ${
          !type && "mt-10"
        }`}
      >
        {totalPage !== 0 && (
          <table className="w-full text-left table-auto min-w-max z-0">
            <thead className="sticky top-0 dark:bg-black bg-white z-1">
              {table?.getHeaderGroups()?.map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup?.headers?.map((header) => (
                    <th
                      className="p-4 border-b border-gray-300  dark:border-gray-700"
                      key={header.id}
                    >
                      <p className="block font-sans text-sm antialiased  leading-none dark:text-[#e4e7ec] text-[#344054] font-bold">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </p>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table?.getRowModel()?.rows?.map((row) => (
                <tr key={row.id}>
                  {row?.getVisibleCells()?.map((cell) => (
                    <td
                      className="p-4 border-b border-gray-300  dark:border-gray-700"
                      key={cell.id}
                    >
                      <p className="block font-sans text-sm antialiased font-normal leading-normal dark:text-[#e4e7ec] text-[#344054]">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {(totalPage == 0 || !totalPage) && <DataNotFound text={text} />}

        {isLoading && <LoadingScreen />}
      </div>
      <div className="">{TablePagination}</div>
    </div>
  );
};

export default memo(CommonTable);
