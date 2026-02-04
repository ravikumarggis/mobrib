// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router";
// import Button from "../../components/ui/button/Button";
// import LoadingScreen from "../../components/common/LoadingScreen";
// import BackComponent from "../../components/backcomponent/BackComponent";

// import {
//   DateTimeFormates,
//   DetailRow,
//   statusColor,
//   statusText,
// } from "../../utils";
// import CopyButton from "../../components/common/CopyButton";
// // import { useApproveRejecttaskDetail } from "../../queries/user-management";
// import { useTaskDetail } from "../../queries/tickets";
// import { useApproveRejectUserDetail } from "../../queries/user-management";

// const ViewTask: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = location.state || {};
//     const { data : taskDetail, isLoading } = useTaskDetail(id?._id);
//   console.log(taskDetail,"taskDetailtaskDetail");

//   const isPending =
//     statusText(taskDetail?.userStatus) === "DELETED";

//   const {
//     mutate: ApproveRejectUser,
//     isPending: cryptoLoading,
//     isSuccess: cryptoSuccess,
//   } = useApproveRejectUserDetail();

//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [TextMessage, setIsTextMessage] = useState("");
//   const [VerifyOrRejected, setIsVerifyOrRejected] = useState("");
//   const [showTextArea, setIsShowTextArea] = useState(false);

//   const handleBlockUnblock = () => {
//     if (!taskDetail?._id) return;

//     ApproveRejectUser({
//       _id: taskDetail._id,
//       status:  taskDetail?.userStatus == "BLOCK" ? "ACTIVE" : "BLOCK",
//     });
//   };

//   const handleReject = () => {

//     if (!taskDetail?._id) return;

//     ApproveRejectUser({
//       _id: taskDetail._id,
//       status: "DELETE",

//     });
//   };

//   useEffect(() => {
//     if (cryptoSuccess) {
//       setShowConfirmModal(false);
//       setIsTextMessage("");

//       navigate("/user-list"); // ✅ redirect
//     }
//   }, [cryptoSuccess, navigate]);

//   return (
//     <>
//       <BackComponent text="Task Details" />

//       <div className="w-full flex flex-col xl:px-40 mt-[5%]">
//         <div className="mb-8 border p-5 rounded border-gray-300 dark:border-gray-700">
//           <div className="space-y-3">
//             <DetailRow label="Name" value={taskDetail?.name || "--"} />
//             <DetailRow label="Email" value={taskDetail?.email || "--"} />
//             <DetailRow label="Mobile no." value={taskDetail?.mobileNumber || "--"} />

//             <div className="flex items-center">
//               <DetailRow label="User Id" value={taskDetail?._id || "--"} />
//               <CopyButton textToCopy={taskDetail?._id} />
//             </div>
//             <DetailRow label="User Type" value={taskDetail?.role || "--"} />

//             <DetailRow
//               label="Date & Time"
//               value={DateTimeFormates(taskDetail?.createdAt)}
//             />

//             <DetailRow
//               label="Status"
//               value={statusText(taskDetail?.userStatus)}
//               color={statusColor(taskDetail?.userStatus)}
//             />

//           </div>
//         </div>

//         {/* ACTION BUTTONS */}
//         {
//             !(taskDetail?.userStatus == "DELETE") &&

//         <div className="flex justify-end gap-4 pb-6">
//           <Button disabled={isPending} onClick={handleBlockUnblock}>
//             {taskDetail?.userStatus == "BLOCK" ? "Unblock" : "Block"}
//           </Button>

//           <Button
//             disabled={isPending}
//             onClick={() => {
//                 handleReject()
//             }}
//             variant="outline"
//           >
//             Delete
//           </Button>
//         </div> }
//       </div>

//       {(cryptoLoading ) && <LoadingScreen />}

//     </>
//   );
// };

// export default ViewTask;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import LoadingScreen from "../../components/common/LoadingScreen";
import BackComponent from "../../components/backcomponent/BackComponent";

import {
  DateTimeFormates,
  DetailRow,
  statusColor,
  statusText,
} from "../../utils";
import CopyButton from "../../components/common/CopyButton";

import {
  useApproveRejectTaskDetail,
  useTaskDetail,
} from "../../queries/tickets";
import { useApproveRejectUserDetail } from "../../queries/user-management";

const TASK_STATUS_OPTIONS = [
  "Posted",
  "Assigned",
  "InProgress",
  "Completed",
  "Rejected",
];

const ViewTask: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  const { data: taskDetail, isLoading } = useTaskDetail(id?._id);

  const {
    mutate: ApproveRejectUser,
    isPending: cryptoLoading,
    isSuccess: cryptoSuccess,
  } = useApproveRejectTaskDetail();

  const [taskStatus, setTaskStatus] = useState("");

  /* Prefill dropdown if status exists */
  useEffect(() => {
    if (taskDetail?.taskStatus) {
      setTaskStatus(taskDetail.taskStatus);
    }
  }, [taskDetail]);

  /* Update task status */
  const handleUpdateTaskStatus = () => {
    if (!taskDetail?._id || !taskStatus) return;

    ApproveRejectUser({
      _id: taskDetail._id,
      taskProgress: taskStatus,
    });
  };

  /* Redirect after success */
  useEffect(() => {
    if (cryptoSuccess) {
      navigate("/task-list");
    }
  }, [cryptoSuccess, navigate]);

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
            <DetailRow
  label="Bids"
  value={
    taskDetail?.bids && taskDetail?.bids.length > 0 ? (
      <div className="space-y-3">
        {taskDetail?.bids?.map((bid: any, index: number) => (
          <div
            key={bid._id || index}
            className="border rounded p-3 text-sm dark:border-gray-700"
          >
            <div>
              <strong>Bidder:</strong> {bid?.userId?.name || "--"}
            </div>

            <div>
              <strong>Email:</strong> {bid?.userId?.email || "--"}
            </div>

            <div>
              <strong>Amount:</strong> ₹{bid?.amount || "--"}
            </div>

            <div>
              <strong>Status:</strong> {statusText(bid?.status)}
            </div>

            <div>
              <strong>Date:</strong>{" "}
              {DateTimeFormates(bid?.createdAt)}
            </div>
          </div>
        ))}
      </div>
    ) : (
      "-- No Bids --"
    )
  }
/>

          </div>
        </div>

        {/* TASK STATUS DROPDOWN */}
      </div>

      {cryptoLoading && <LoadingScreen />}
    </>
  );
};

export default ViewTask;
