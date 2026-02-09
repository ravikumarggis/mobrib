import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import LoadingScreen from "../../components/common/LoadingScreen";
import BackComponent from "../../components/backcomponent/BackComponent";
import { useApproveRejectCrptoWithdraw } from "../../queries/withdrawal-management";
import {
  DateTimeFormates,
  DetailRow,
  statusColor,
  statusText,
} from "../../utils";
import DynamicConfirmModal from "../../components/modal/DynamicConfirmModal";
import { useApproveRejectKyc } from "../../queries/kyc-management";

const KycView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { kycDetail } = location.state || {};

  console.log(kycDetail,"kycDetailkycDetail");
  

  const isPending = statusText(kycDetail?.status) === "verified";

  const {
    mutate: ApproveRejectKyc,
    isPending: cryptoLoading,
    isSuccess: cryptoSuccess,
  } = useApproveRejectKyc();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [TextMessage, setIsTextMessage] = useState("");
  const [VerifyOrRejected, setIsVerifyOrRejected] = useState("");
  const [showTextArea, setIsShowTextArea] = useState(false);

  // ✅ Image preview state
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleAccept = () => {
    if (!kycDetail?._id) return;

    ApproveRejectKyc({
      _id: kycDetail._id,
      status: "verified",
    });
  };

  const handleReject = () => {
    if (!kycDetail?._id) return;

    ApproveRejectKyc({
      _id: kycDetail._id,
      status: "rejected",
      message: TextMessage,
    });
  };

  useEffect(() => {
    if (cryptoSuccess) {
      setShowConfirmModal(false);
      setIsTextMessage("");
      navigate("/kyc-list");
    }
  }, [cryptoSuccess, navigate]);

  return (
    <>
      <BackComponent text="KYC Details" />

      <div className="w-full flex flex-col xl:px-40 mt-[5%]">
        <div className="mb-8 border p-5 rounded border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">KYC Details</h3>

          <div className="space-y-3">
           
            <DetailRow
              label="Name"
              value={kycDetail?.userId?.name || "--"}
            />
            <DetailRow
              label="Email"
              value={kycDetail?.userId?.email || "--"}
            />
             <DetailRow
              label="Mobile Number"
              value={kycDetail?.userId?.mobileNumber || "--"}
            />
            <DetailRow
              label="PAN Number"
              value={kycDetail?.
                panDetails?.panNumber || "--"}
            />
            <DetailRow
              label="Aadhaar Number"
              value={kycDetail?.adharDetails?.adharNumber || "--"}
            />
            <DetailRow label="Address" value={kycDetail?.adharDetails?.address || "--"} />
          
  
            <DetailRow
              label="KYC Status"
              value={statusText(kycDetail?.status)}
              color={statusColor(kycDetail?.status)}
            />
                {kycDetail?.message && (
                          <DetailRow
                            label="Reason"
                            value={kycDetail.message}
                            color={statusColor(kycDetail?.status)}
                          />
                        )}
          </div>

        
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-4 pb-6">
          <Button 
          // disabled={isPending}
           onClick={handleAccept}>
            Accept
          </Button>

          <Button
            // disabled={isPending}
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

      {cryptoLoading && <LoadingScreen />}

      <DynamicConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleReject}
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

      {/* ✅ FULL IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white text-2xl"
              onClick={() => setPreviewImage(null)}
            >
              ✕
            </button>

            <img
              src={previewImage}
              alt="Full Preview"
              className="w-full max-h-[85vh] object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default KycView;
