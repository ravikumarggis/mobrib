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

const WithDrawCryptoView: React.FC = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { withdrawDetail } = location.state || {};

  const isPending =
    statusText(withdrawDetail?.withdrawStatus) === "Pending";

  const {
    mutate: ApproveRejectCryptoWithdrawal,
    isPending: cryptoLoading,
    isSuccess: cryptoSuccess,
  } = useApproveRejectCrptoWithdraw();

  

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [TextMessage, setIsTextMessage] = useState("");
  const [VerifyOrRejected, setIsVerifyOrRejected] = useState("");
  const [showTextArea, setIsShowTextArea] = useState(false);

  const handleAccept = () => {
    if (!withdrawDetail?._id) return;

    ApproveRejectCryptoWithdrawal({
      _id: withdrawDetail._id,
      action: "VERIFIED",
    });
  };

  const handleReject = () => {

    console.log("uhuhhhhhuh");
    
    if (!withdrawDetail?._id) return;

    ApproveRejectCryptoWithdrawal({
      _id: withdrawDetail._id,
      action: "REJECTED",
      rejectionReason: TextMessage,
    });
  };

  useEffect(() => {
    if (cryptoSuccess) {
      setShowConfirmModal(false);
      setIsTextMessage("");

      navigate("/withdraw-inr"); // ✅ redirect
    }
  }, [cryptoSuccess, navigate]);

  return (
    <>
      <BackComponent text="Withdraw Details" />

      <div className="w-full flex flex-col xl:px-40 mt-[5%]">
        <div className="mb-8 border p-5 rounded border-gray-300 dark:border-gray-700">
          <div className="space-y-3">
            <DetailRow label="Amount" value={`₹${withdrawDetail?.amount || "--"}`} />
            <DetailRow label="Name" value={withdrawDetail?.user?.name || "--"} />
            <DetailRow label="Email" value={withdrawDetail?.user?.email || "--"} />

            <div className="flex items-center">
              <DetailRow label="User Id" value={withdrawDetail?.user?._id || "--"} />
              <CopyButton textToCopy={withdrawDetail?.user?._id} />
            </div>

            <DetailRow
              label="Date & Time"
              value={DateTimeFormates(withdrawDetail?.createdAt)}
            />

            <div className="flex items-center">
              <DetailRow label="Withdraw Id" value={withdrawDetail?._id || "--"} />
              <CopyButton textToCopy={withdrawDetail?._id} />
            </div>

            <DetailRow label="A/C Number" value={withdrawDetail?.bank?.accountNumber || "--"} />
            <DetailRow label="Bank Name" value={withdrawDetail?.bank?.bankName || "--"} />
            <DetailRow label="IFSC Code" value={withdrawDetail?.bank?.ifscCode || "--"} />
            <DetailRow label="Holder Name" value={withdrawDetail?.bank?.holderName || "--"} />

            <DetailRow
              label="Status"
              value={statusText(withdrawDetail?.withdrawStatus)}
              color={statusColor(withdrawDetail?.withdrawStatus)}
            />

            {withdrawDetail?.rejectionReason && (
              <DetailRow
                label="Reason"
                value={withdrawDetail.rejectionReason}
                color={statusColor(withdrawDetail?.withdrawStatus)}
              />
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4 pb-6">
          <Button disabled={!isPending} onClick={handleAccept}>
            Accept
          </Button>

          <Button
            disabled={!isPending}
            onClick={() => {
              setIsVerifyOrRejected("REJECT");
              setIsShowTextArea(true);
              setShowConfirmModal(true);
            }}
          >
            Reject
          </Button>
        </div>
      </div>

      {(cryptoLoading ) && <LoadingScreen />}

      <DynamicConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={()=>{
          handleReject()
        }}
        message="Are you sure you want to reject this withdrawal?"
        btnTextConfirm="Reject"
        btnTextClose="Cancel"
        showDeleteIcon={false}
        lable="Reject Reason"
        TextMessage={TextMessage}
        setIsTextMessage={setIsTextMessage}
        VerifyOrRejected={VerifyOrRejected}
        placeholderText="Enter rejection reason"
        errorText="Reason is required"
        showTextArea={showTextArea}
      />
    </>
  );
};

export default WithDrawCryptoView;
