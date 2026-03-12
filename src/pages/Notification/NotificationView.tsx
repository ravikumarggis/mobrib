import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import BackComponent from "../../components/backcomponent/BackComponent";
import { DetailRow, statusColor, statusText } from "../../utils";

const NotificationView: React.FC = () => {
  const location = useLocation();
  const { NotificationDetail } = location.state || {};

  console.log(NotificationDetail, "NotificationDetailNotificationDetail");

  return (
    <>
      <BackComponent text="Notification Details" />

      <div className="w-full flex flex-col xl:px-40 mt-[5%]">
        <div className="mb-8 border p-5 rounded border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Notification Details
          </h3>

          <div className="space-y-3">
            <DetailRow
              label="Heading"
              value={NotificationDetail?.heading || "--"}
            />
            <DetailRow
              label="Message"
              value={NotificationDetail?.msg || "--"}
            />

            <DetailRow
              label="KYC Status"
              value={statusText(NotificationDetail?.status)}
              color={statusColor(NotificationDetail?.status)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationView;
