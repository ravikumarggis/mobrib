import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import BackComponent from "../../components/backcomponent/BackComponent";
import { DetailRow, statusColor, statusText } from "../../utils";

const FeedbackView: React.FC = () => {
  const location = useLocation();
  const { state } = location.state || {};

  console.log(state, "statestate");

  return (
    <>
      <BackComponent text="Feedback Details" />

      <div className="w-full flex flex-col xl:px-40 mt-[5%]">
        <div className="mb-8 border p-5 rounded border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Feedback Details
          </h3>

          <div className="space-y-3">
            {/* Rating Info */}
            <DetailRow label="Rating" value={state?.rating || "--"} />

            <DetailRow label="Comment" value={state?.comment || "--"} />

            {/* Rater Details */}
            <DetailRow
              label="Rater Name"
              value={state?.rater?.[0]?.name || "--"}
            />

            <DetailRow
              label="Rater Email"
              value={state?.rater?.[0]?.email || "--"}
            />

            <DetailRow
              label="Rater Mobile"
              value={state?.rater?.[0]?.mobileNumber || "--"}
            />

            {/* Rated User Details */}
            <DetailRow
              label="Rated User Name"
              value={state?.ratedUser?.[0]?.name || "--"}
            />

            <DetailRow
              label="Rated User Email"
              value={state?.ratedUser?.[0]?.email || "--"}
            />

            <DetailRow
              label="Rated User Mobile"
              value={state?.ratedUser?.[0]?.mobileNumber || "--"}
            />
            <DetailRow
              label="Status"
              value={state?.status || "--"}
              color={statusColor(state?.status)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackView;
