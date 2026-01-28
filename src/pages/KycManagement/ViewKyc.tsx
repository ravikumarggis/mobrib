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

  const isPending = statusText(kycDetail?.kycStatus) === "Pending";

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
      action: "VERIFIED",
    });
  };

  const handleReject = () => {
    if (!kycDetail?._id) return;

    ApproveRejectKyc({
      _id: kycDetail._id,
      action: "REJECTED",
      rejectionReason: TextMessage,
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
      <BackComponent text="Withdraw Details" />

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
              value={kycDetail?.panNumber || "--"}
            />
            <DetailRow
              label="Aadhaar Number"
              value={kycDetail?.aadhaarNumber || "--"}
            />
            <DetailRow label="Address" value={kycDetail?.address || "--"} />
            <DetailRow label="City" value={kycDetail?.city || "--"} />
            <DetailRow label="State" value={kycDetail?.state || "--"} />
            <DetailRow label="Pincode" value={kycDetail?.areaPincode || "--"} />
            <DetailRow label="About User" value={kycDetail?.aboutUs || "--"} />
            <DetailRow
              label="KYC Status"
              value={statusText(kycDetail?.kycStatus)}
              color={statusColor(kycDetail?.kycStatus)}
            />
                {kycDetail?.rejectionReason && (
                          <DetailRow
                            label="Reason"
                            value={kycDetail.rejectionReason}
                            color={statusColor(kycDetail?.kycStatus)}
                          />
                        )}
          </div>

          {/* DOCUMENT IMAGES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            <div>
              <p className="text-sm mb-1 dark:text-white">PAN Card</p>
              <img
                src={kycDetail?.panFrontUrl}
                alt="PAN"
                className="rounded border h-40 w-full object-cover cursor-pointer hover:opacity-80"
                onClick={() => setPreviewImage(kycDetail?.panFrontUrl)}
              />
            </div>

            <div>
              <p className="text-sm mb-1 dark:text-white">Aadhaar Front</p>
              <img
                src={kycDetail?.aadhaarFrontUrl}
                alt="Aadhaar Front"
                className="rounded border h-40 w-full object-cover cursor-pointer hover:opacity-80"
                onClick={() => setPreviewImage(kycDetail?.aadhaarFrontUrl)}
              />
            </div>

            <div>
              <p className="text-sm mb-1 dark:text-white">Aadhaar Back</p>
              <img
                src={kycDetail?.aadhaarBackUrl}
                alt="Aadhaar Back"
                className="rounded border h-40 w-full object-cover cursor-pointer hover:opacity-80"
                onClick={() => setPreviewImage(kycDetail?.aadhaarBackUrl)}
              />
            </div>
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
