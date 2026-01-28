import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import LoadingScreen from "../../components/common/LoadingScreen";
import BackComponent from "../../components/backcomponent/BackComponent";
import {
  
  useApproveRejectCrptoWithdraw,
} from "../../queries/withdrawal-management";
import {
  DateTimeFormates,
  DetailRow,
  statusColor,
  statusText,
} from "../../utils";
import CopyButton from "../../components/common/CopyButton";
import DynamicConfirmModal from "../../components/modal/DynamicConfirmModal";
import { useApproveRejectUserDetail } from "../../queries/user-management";

const ViewUser: React.FC = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { userDetail } = location.state || {};
  console.log(userDetail,"userDetailuserDetail");
  

  const isPending =
    statusText(userDetail?.userStatus) === "DELETED";

  const {
    mutate: ApproveRejectUser,
    isPending: cryptoLoading,
    isSuccess: cryptoSuccess,
  } = useApproveRejectUserDetail();

  

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [TextMessage, setIsTextMessage] = useState("");
  const [VerifyOrRejected, setIsVerifyOrRejected] = useState("");
  const [showTextArea, setIsShowTextArea] = useState(false);

  const handleBlockUnblock = () => {
    if (!userDetail?._id) return;

    ApproveRejectUser({
      _id: userDetail._id,
      status:  userDetail?.userStatus == "BLOCK" ? "ACTIVE" : "BLOCK",
    });
  };

  const handleReject = () => {

   
    
    if (!userDetail?._id) return;

    ApproveRejectUser({
      _id: userDetail._id,
      status: "DELETE",
      
    });
  };

  useEffect(() => {
    if (cryptoSuccess) {
      setShowConfirmModal(false);
      setIsTextMessage("");

      navigate("/user-list"); // ✅ redirect
    }
  }, [cryptoSuccess, navigate]);

  return (
    <>
      <BackComponent text="User Details" />

      <div className="w-full flex flex-col xl:px-40 mt-[5%]">
        <div className="mb-8 border p-5 rounded border-gray-300 dark:border-gray-700">
          <div className="space-y-3">
            <DetailRow label="Name" value={userDetail?.name || "--"} />
            <DetailRow label="Email" value={userDetail?.email || "--"} />
            <DetailRow label="Mobile no." value={userDetail?.mobileNumber || "--"} />

            <div className="flex items-center">
              <DetailRow label="User Id" value={userDetail?._id || "--"} />
              <CopyButton textToCopy={userDetail?._id} />
            </div>
            <DetailRow label="User Type" value={userDetail?.role || "--"} />


            <DetailRow
              label="Date & Time"
              value={DateTimeFormates(userDetail?.createdAt)}
            />

           

           

            <DetailRow
              label="Status"
              value={statusText(userDetail?.userStatus)}
              color={statusColor(userDetail?.userStatus)}
            />

           
          </div>
        </div>

        {/* ACTION BUTTONS */}
        {
            !(userDetail?.userStatus == "DELETE") &&
       
        <div className="flex justify-end gap-4 pb-6">
          <Button disabled={isPending} onClick={handleBlockUnblock}>
            {userDetail?.userStatus == "BLOCK" ? "Unblock" : "Block"}
          </Button>

          <Button
            disabled={isPending}
            onClick={() => {
                handleReject()
            }}
            variant="outline"
          >
            Delete
          </Button>
        </div> }
      </div>

      {(cryptoLoading ) && <LoadingScreen />}

     
    </>
  );
};

export default ViewUser;
