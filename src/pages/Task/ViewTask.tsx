

import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import LoadingScreen from "../../components/common/LoadingScreen";
import BackComponent from "../../components/backcomponent/BackComponent";

import {
  DateTimeFormates,
  DetailRow,
  Pagination,
  statusText,
} from "../../utils";

import {
  useApproveRejectBid,
  useTaskDetail,
} from "../../queries/tickets";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CommonTable from "../../components/common/CommonTable";
import { useSetSearchParam } from "../../hooks/useSetSearchParam";
import ConfirmModal from "../../components/modal/confirmModal";


const TASK_STATUS_OPTIONS = [
  "Posted",
  "Assigned",
  "InProgress",
  "Completed",
  "Rejected",
];

interface InrWithdrawListRowData {
  id: string;
  bidStatus : string;
  amount: any;
  platformFee: string;
  taskLocation: string;
  location: any;

  paymentStatus: string;
  taskProgress: string;
  createdAt: string;

  Action: any;
}

const columnHelper = createColumnHelper<InrWithdrawListRowData>();

const ViewTask: React.FC = () => {
  const navigate = useNavigate();
  const { setParam, removeParam } = useSetSearchParam();
  const location = useLocation();
  const { id } = location.state || {};
    const [showConfirmationModal, setshowConfirmationModal] = useState(false);
    const [selectCategoryID, setselectCategoryID] = useState("");

  const { data: taskDetail, isLoading } = useTaskDetail(id?._id);

  console.log(taskDetail?.bids, "taskDetailtaskDetail");

  const {
    mutate: ApproveRejectBid,
    isPending: cryptoLoading,
    isSuccess: cryptoSuccess,
  } = useApproveRejectBid();

  const [taskStatus, setTaskStatus] = useState("");

  /* Prefill dropdown if status exists */
  useEffect(() => {
    if (taskDetail?.taskStatus) {
      setTaskStatus(taskDetail.taskStatus);
    }
  }, [taskDetail]);

  /* Update task status */
  const handleUpdateTaskStatus = () => {
    if (!selectCategoryID ) return;

    ApproveRejectBid({
      _id: selectCategoryID,
      bidStatus: "REJECTED",
    });
  };

  /* Redirect after success */
  useEffect(() => {
    if (cryptoSuccess) {
      navigate("/task-list");
    }
  }, [cryptoSuccess, navigate]);
  const formateData = useMemo(() => {
    const tabledata = taskDetail?.bids ?? [];
    const pages = 1;

    return { tabledata, pages };
  }, [taskDetail]);

  const columns = [
    {
      header: "Sr. No",
      id: "serial",
      cell: ({ row, table }) => Pagination({ table, row }),
    },
    columnHelper.accessor(row => row?.hirerId?.name, {
      id: "name",
      header: "Name",
      cell: info => info.getValue() || "--",
    }),
    
    columnHelper.accessor(row => row?.hirerId?.email, {
      id: "email",
      header: "Email",
      cell: info => info.getValue() || "--",
    }),
 
    columnHelper.accessor(row => row?.amount, {
      id: "amount",
      header: "Amount",
      cell: info => info.getValue() || "--",
    }),
  
    columnHelper.accessor(row => row.bidStatus, {
      id: "status",
      header: "Status",
      cell: info => info.getValue() || "--",
    }),
  
  
  
    columnHelper.accessor("createdAt", {
      header: "Date & Time",
      cell: info => DateTimeFormates(info.getValue()),
    }),
  
    {
      header: "Action",
      id: "view",
      cell: ({ row }) => (
       
        <Button
        className=" py-3 bg-red-700 hover:bg-red-600"
        disabled={row.original.bidStatus == "REJECTED"}
        onClick={() => {
          setselectCategoryID(row.original._id);
                setshowConfirmationModal(true);
        }}
      >
        Reject
      </Button>
      ),
    },
  ];
  

  const table = useReactTable({
    data: formateData?.tabledata,
    columns: columns ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  const tableData = {
    isLoading,
    table,
    // type: "userList",
    totalPage: formateData?.pages,

    removeParamFn: () => removeParam("page"),
    setSearchParamsFn: (page: number) => setParam("page", page),
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <BackComponent text="Task Details" />

      <div className="w-full flex flex-col xl:px-40 mt-[5%]">
        <div className="mb-6 flex flex-row  justify-between items-center">
          <div className="flex-row ">
            <label className="dark:text-white block mb-2 font-medium ">
              Task Status
            </label>

            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="dark:text-white w-64 border rounded px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
            >
              <option value="">Select status</option>
              {TASK_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <Button
              disabled={!taskStatus || cryptoLoading}
              onClick={handleUpdateTaskStatus}
            >
              Update Status
            </Button>
          </div>

          {/* ACTION BUTTONS */}
        </div>
        <div className="mb-8 border p-5 rounded border-gray-300 dark:border-gray-700">
          <div className="space-y-3">
            <DetailRow label="Name" value={taskDetail?.userId?.name || "--"} />
            <DetailRow
              label="Email"
              value={taskDetail?.userId?.email || "--"}
            />
            <DetailRow
              label="Payment Status"
              value={taskDetail?.paymentStatus || "--"}
            />

            {/* Task Location */}
            <DetailRow
              label="Task Location Type"
              value={taskDetail?.taskLocation || "--"}
            />

            <DetailRow
              label="Address"
              value={taskDetail?.currentLocation || "--"}
            />

            <DetailRow
              label="Latitude"
              value={
                taskDetail?.location?.coordinates
                  ? taskDetail.location.coordinates[1]
                  : "--"
              }
            />

            <DetailRow
              label="Longitude"
              value={
                taskDetail?.location?.coordinates
                  ? taskDetail.location.coordinates[0]
                  : "--"
              }
            />

            <DetailRow
              label="Date & Time"
              value={DateTimeFormates(taskDetail?.createdAt)}
            />

            <DetailRow
              label="Status"
              value={statusText(taskDetail?.taskProgress)}
            />
          </div>
        </div>

        {/* TASK STATUS DROPDOWN */}
      </div>

      <label className="dark:text-white block mb-2 font-medium ">
        Bids List
      </label>

      <CommonTable tableData={tableData} />

      {cryptoLoading && <LoadingScreen />}

      {
        showConfirmationModal && (
          <ConfirmModal
            message="Are you sure you want to Reject this Bid?"
            isOpen={showConfirmationModal}
            btnTextClose="Close"
            btnTextConfirm="Confirm"
            onClose={() => setshowConfirmationModal(false)}
            onConfirm={() => {
              handleUpdateTaskStatus()
              setshowConfirmationModal(false);
            }}
          />
        )
      }
    </>
  );
};

export default ViewTask;
