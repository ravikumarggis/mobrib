import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import BackComponent from "../../components/backcomponent/BackComponent";
import { DetailRow, statusColor, statusText } from "../../utils";
import { useGetDispiteDetail } from "../../queries/dispute";

const DisputeView: React.FC = () => {
  const location = useLocation();
  const { state } = location.state || {};
  const { data, isLoading } = useGetDispiteDetail(state?._id as string);

  const navigate = useNavigate()

  return (
    <>
      <BackComponent text="Dispute Details" />

      <div className="w-full flex flex-col xl:px-40 mt-[5%]">
        {data?.disputeStatus == "Pending" && (
          <div className="flex justify-end items-end mb-4">
            <button  onClick={() => {
                navigate("/deposit-update");
              }} className="flex items-center justify-center  px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
              Update
            </button>
          </div>
        )}
        <div className="mb-8 border p-5 rounded border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Dispute Details
          </h3>

          <div className="space-y-3">
            <DetailRow label="Description" value={data?.description || "--"} />
            <DetailRow
              label="Poster Name"
              value={data?.posterId?.name || "--"}
            />
            <DetailRow
              label="Tasker Name"
              value={data?.taskerId?.name || "--"}
            />
            <DetailRow label="Fee" value={data?.fee || "--"} />
            <DetailRow label="Reason" value={data?.reason || "--"} />

            <div className="mt-6">
              <h4 className="text-md font-semibold mb-3 dark:text-white">
                Conversations
              </h4>

              <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto border rounded p-3">
                {data?.conversations?.length > 0 ? (
                  data?.conversations?.map((msg: any) => {
                    const isPoster = msg.senderId === data?.posterId?._id;

                    return (
                      <div
                        key={msg._id}
                        className={`flex ${
                          isPoster ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[65%] px-4 py-2 rounded-lg text-sm ${
                            isPoster
                              ? "bg-gray-200 text-black rounded-bl-none"
                              : "bg-blue-500 text-white rounded-br-none"
                          }`}
                        >
                          <p>{msg.message}</p>

                          <span className="text-[10px] opacity-70 block mt-1">
                            {new Date(msg.time).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-sm">No messages found</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-3 dark:text-white">
                Evidence
              </h4>

              {data?.evidence?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {data.evidence.map((img: string, index: number) => (
                    <div
                      key={index}
                      className="w-24 h-24 rounded overflow-hidden border cursor-pointer hover:scale-105 transition"
                    >
                      <img
                        src={img}
                        alt={`evidence-${index}`}
                        className="w-full h-full object-cover"
                        onClick={() => window.open(img, "_blank")}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No evidence provided</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisputeView;
