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
import { Switch } from "@headlessui/react";
import { useApproveRejectUserDetail } from "../../queries/user-management";

const ViewUser: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetail } = location.state || {};

  console.log(userDetail,"userDetailuserDetail");
  

  const isPending = statusText(userDetail?.userStatus) === "DELETED";

  const {
    mutate: ApproveRejectUser,
    isPending: cryptoLoading,
    isSuccess: cryptoSuccess,
  } = useApproveRejectUserDetail();

  const [isBlocked, setIsBlocked] = useState(userDetail?.userblock || false);
  const [isSuspended, setIsSuspended] = useState(userDetail?.userSuspend || false);

  useEffect(() => {
    if (userDetail) {
      setIsBlocked(userDetail?.userblock || false);
    }
  }, [userDetail]);

  const handleBlockToggle = (value: boolean) => {
    setIsBlocked(value);

    ApproveRejectUser({
      _id: userDetail._id,
      status: value,
    });
  };

  const handleSuspendToggle = (value: boolean) => {
    setIsSuspended(value);

    if (value) {
      ApproveRejectUser({
        _id: userDetail._id,
        status: "DELETE",
      });
    }
  };

  useEffect(() => {
    if (cryptoSuccess) {
      navigate("/user-list");
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

        {/* TOGGLES */}

        <div className="flex justify-end gap-6 pb-6 items-center">
          {/* BLOCK TOGGLE */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium dark:text-white">Block</span>

            <Switch
              checked={isBlocked}
              onChange={handleBlockToggle}
              disabled={isPending}
              className={`${
                isBlocked ? "bg-red-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  isBlocked ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          {/* SUSPEND TOGGLE */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium dark:text-white">Suspend</span>

            <Switch
              checked={isSuspended}
              onChange={handleSuspendToggle}
              className={`${
                isSuspended ? "bg-yellow-500" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  isSuspended ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </div>

      {cryptoLoading && <LoadingScreen />}
    </>
  );
};

export default ViewUser;