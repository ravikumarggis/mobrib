import React, { useEffect, useState } from "react";
import BackComponent from "../../components/backcomponent/BackComponent";
import {
  useTicketsDetails,
  useTicketsList,
  useTicketStatus,
} from "../../queries/tickets";
import ChatUI from "./ChatUI";
import { useParams } from "react-router";
// import CopyButton from "../../components/common/CopyButton";
import ConfirmModal from "../../components/modal/confirmModal";
import ToggleSwitchButton from "../../components/form/ToggleSwitchButton";
import LoadingScreen from "../../components/common/LoadingScreen";
import { IoMdEye } from "react-icons/io";
import ChatUIModal from "./ChatUIModal";
import useModulePermissions from "../../queries/subAdmin";
import CopyButton from "../../components/common/CopyButton";

interface CloseTicketData {
  status: string;
  ticketId: number | null;
}

const TicketDetails: React.FC = () => {
  const [showConfirmationModal, setshowConfirmationModal] = useState(false);
  const [isActiveInactive, setIsActiveInactive] = useState(false);
  const [clostTicketData, setclostTicketData] = useState<CloseTicketData>({ status: "", ticketId: null, });
  const [selectOtherQueryTicketID, setselectOtherQueryTicketID] = useState("");
  const [consverSession, setconsverSession] = useState([]);
  const [ticketStatus, setticketStatus] = useState("");
  const [OtherQueryData, setOtherQueryData] = useState([]);
  const [isOpenChatUIModal, setisOpenChatUIModal] = useState(false);
  const { write } = useModulePermissions("Help And Support");

  const { id } = useParams<{ id: string | undefined }>();
  const { data: TicketDetails, isLoading } = useTicketsDetails(id);
  const { mutate } = useTicketStatus();
  // const { data: ticketList } = useTicketsList();




  useEffect(() => {
    // const OtherQueryList = ticketList?.data?.result?.docs?.filter((item: any) =>
    //   item?.user?.user_id === TicketDetails?.data?.result?.user?.user_id &&
    //   !TicketDetails?.data?.result?.isGuestUser &&
    //   item?.ticketId !== TicketDetails?.data?.result?.ticketId
    const OtherQueryList = TicketDetails?.data?.result?.otherTicketDetails ?? []
    setOtherQueryData(OtherQueryList);
  }, [TicketDetails]);

  useEffect(() => {
    if (TicketDetails?.data?.result?.ticketStatus) {
      const status = TicketDetails.data.result.ticketStatus.trim();
      setIsActiveInactive(!["pending", "in-process"].includes(status));
    }
  }, [TicketDetails]);

  const handleactive = (TicketStatus: string, ticketId: number | null) => {
    if (!showConfirmationModal) {
      setshowConfirmationModal(true);
      setclostTicketData({
        status:
          TicketStatus === "pending" || TicketStatus === "in-process"
            ? "resolved"
            : "pending",
        ticketId: ticketId,
      });
    }
  };

  return (
    <div>
      <div>
        <BackComponent text="Ticket Details" />
      </div>

      <div className="w-full flex justify-center mt-8">
        <div className="w-full sm:w-[80%] flex flex-col sm:flex-row sm:justify-between space-x-8 space-y-6 px-2 sm:px-0">
          <div className="w-full sm:w-[80%] flex flex-col space-y-2.5">
            <div>
              <h2 className="text-base sm:text-lg font-semibold dark:text-white">
                User Details
              </h2>
              <div className="flex flex-col space-y-4 mt-1.5">
                <div className="flex justify-between w-full border rounded-lg p-4">
                  <div className="text-start dark:text-white space-y-1">
                    {!TicketDetails?.data?.result?.isGuestUser && (
                      <p>User Id</p>
                    )}

                    <p>Name</p>
                    <p>KYC Status</p>
                  </div>
                  <div className="text-end dark:text-white">
                    {!TicketDetails?.data?.result?.isGuestUser && (
                      <p className="-mr-2">
                        {TicketDetails?.data?.result?.user?.user_id
                          ? TicketDetails?.data?.result?.user?.user_id
                          : "--"}
                        <span>
                          <CopyButton
                            textToCopy={
                              TicketDetails?.data?.result?.user?.user_id
                            }
                          />
                        </span>
                      </p>
                    )}

                    <p>
                      {TicketDetails?.data?.result?.name
                        ? TicketDetails?.data?.result?.name
                        : "--"}
                    </p>
                    <p>
                      {TicketDetails?.data?.result?.user?.isKYCVerify
                        ? "Verified"
                        : "Not-Verified"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between border rounded-lg p-4">
                  <div className="text-start dark:text-white">
                    <p>Ticket Id</p>
                    <p>Support Subject</p>
                    <p>Status</p>
                    <p>Close Ticket</p>
                    {/* <p>Feedback Rating</p>
                    <p>Feedback Message</p> */}
                  </div>
                  <div className="text-end">
                    <p className="dark:text-white">
                      {TicketDetails?.data?.result?.ticketId
                        ? TicketDetails?.data?.result?.ticketId
                        : "--"}
                    </p>
                    <p className="dark:text-white">
                      {" "}
                      {TicketDetails?.data?.result?.categoryType
                        ? TicketDetails?.data?.result?.categoryType
                        : "--"}
                    </p>
                    <p
                      className={`${TicketDetails?.data?.result?.ticketStatus === "pending"
                        ? "text-orange-500"
                        : TicketDetails?.data?.result?.ticketStatus ===
                          "resolved"
                          ? "text-green-500"
                          : "text-yellow-700"
                        } capitalize`}
                    >
                      {TicketDetails?.data?.result?.ticketStatus
                        ? TicketDetails?.data?.result?.ticketStatus
                        : "--"}
                    </p>

                    <p className="flex justify-end">
                      <ToggleSwitchButton
                        checked={isActiveInactive}
                        disabled={write ? false : true}
                        onChange={() =>
                          handleactive(
                            TicketDetails?.data?.result?.ticketStatus,
                            // TicketDetails?.data?.result?.ticketId
                            Number(id)
                          )
                        }
                      />
                    </p>
                    {/* <p className="dark:text-white">
                      {" "}
                      {TicketDetails?.data?.result?.starRate
                        ? TicketDetails?.data?.result?.starRate
                        : "--"}
                    </p>
                    <p className="dark:text-white">
                      {" "}
                      {TicketDetails?.data?.result?.feedbackMessage
                        ? TicketDetails?.data?.result?.feedbackMessage
                        : "--"}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>

            {OtherQueryData?.length != 0 && (
              <div>
                <h2 className="text-base sm:text-lg font-semibold dark:text-white">
                  User Other Query List
                </h2>
                <div className="mt-2 border rounded-lg">
                  {OtherQueryData?.map((item: any) => {
                    return (
                      <div className="flex justify-between items-center  dark:text-white  py-1 px-3 space-x-1">
                        <div className="flex justify-start items-center space-x-3">
                          <div className="flex space-x-2">
                            <p>Ticket Id:</p>
                            <p>{item?.ticketId}</p>
                          </div>
                        </div>
                        <div>
                          <IoMdEye
                            size={25}
                            className="cursor-pointer"
                            onClick={() => {
                              setticketStatus(item?.ticketStatus);
                              setconsverSession(item?.conversations);
                              setselectOtherQueryTicketID(item?.ticketId);
                              setisOpenChatUIModal(true);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="w-full">
            <h2 className="text-base sm:text-lg font-semibold dark:text-white">
              Communication
            </h2>
            <div>
              <ChatUI
                // ticketId={TicketDetails?.data?.result?.id}
                ticketId={TicketDetails?.data?.result?.ticketId}
                isActiveInactive={isActiveInactive}
                IsGuestUser={TicketDetails?.data?.result?.isGuestUser}
              />
            </div>
          </div>
        </div>
      </div>
      {
        <ConfirmModal
          isOpen={showConfirmationModal}
          onClose={() => setshowConfirmationModal(false)}
          btnTextClose="No, Cancel"
          btnTextConfirm="Yes, I'am sure"
          onConfirm={() => {
            if (clostTicketData?.ticketId !== null) {
              mutate(clostTicketData);
              setshowConfirmationModal(false);
            }
          }}
          message={
            isActiveInactive
              ? "Are you sure want to re-open this ticket?"
              : "Are you sure want to close this ticket?"
          }
        />
      }

      {isLoading && <LoadingScreen />}

      <ChatUIModal
        selectOtherQueryTicketID={selectOtherQueryTicketID}
        isOpen={isOpenChatUIModal}
        onClose={() => setisOpenChatUIModal(false)}
        consverSession={consverSession}
        ticketStatus={ticketStatus}
      />
    </div>
  );
};

export default TicketDetails;
