import React, { useState, ChangeEvent, useEffect } from "react";
import { useUploadImage } from "../../queries/helpandspport";
import { useTicketChat } from "../../queries/tickets";
import { IoClose } from "react-icons/io5";
import moment from "moment";
import ImagePreviewModal from "../../components/modal/ImagePreviewModal";
import useModulePermissions from "../../queries/subAdmin";
import { DateTimeFormates } from "../../utils";

interface Message {
  id?: number;
  content?: string;
  type?: "text" | "image";
  time?: string;
  text?: string;
  ticketId?: number;
  message?: string;
  image?: string;
  system_message?: boolean;
}

interface ChatUIProps {
  isOpen: boolean;
  onClose: () => void;
  selectOtherQueryTicketID: any;
  consverSession: any;
  ticketStatus: string;
}

const ChatUIModal: React.FC<ChatUIProps> = ({
  selectOtherQueryTicketID,
  isOpen,
  onClose,
  ticketStatus,
  consverSession,
}) => {
  const [OTmessages, setOTMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isOpenImge, setIsOpenImage] = useState(false);
  const [ImageUrl, setImageUrl] = useState<string | undefined>("");
  const { data: UplodaImageData, mutate: UploadIamge } = useUploadImage();
  const { mutate, data: ChatMassage } = useTicketChat();
  const { write } = useModulePermissions("Help And Support");

  const handleSend = () => {
    if (!newMessage.trim() && !imagePreview) return;

    const newMsg: Message = {
      content: imagePreview || newMessage,
      type: imagePreview ? "image" : "text",
      time: Date.now()?.toLocaleString(),
      text: imagePreview ? newMessage : undefined,
      system_message: true,
    };

    mutate({
      ticketId: selectOtherQueryTicketID,
      ...(newMessage && { message: newMessage }),
      ...(imagePreview && { image: imagePreview }),
    });

    setOTMessages([...OTmessages, newMsg]);
    setNewMessage("");
    setImagePreview("");

    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    UploadIamge(file);
  };

  useEffect(() => {
    setImagePreview(UplodaImageData?.data?.result?.url);
  }, [UplodaImageData]);

  useEffect(() => {
    if (ChatMassage) {
      const ChatHistroy =
        ChatMassage?.data?.result?.[1]?.[0]?.conversations?.map(
          (item: any) => ({
            content: item?.image || item?.message,
            type: item?.image ? "image" : "text",
            time: DateTimeFormates(item?.time),
            //  moment(item?.time).format("MMMM Do YYYY, h:mm:ss a"),
            text: item?.image ? item?.message : undefined,
            system_message: item?.system_message,
          })
        ) ?? [];
      setOTMessages(ChatHistroy);
    } else {
      const ChatHistroy =
        consverSession?.map((item: any) => ({
          content: item?.image || item?.message,
          type: item?.image ? "image" : "text",
          time: DateTimeFormates(item?.time),
          //  moment(item?.time).format("MMMM Do YYYY, h:mm:ss a"),
          text: item?.image ? item?.message : undefined,
          system_message: item?.system_message,
        })) ?? [];
      setOTMessages(ChatHistroy);
    }
  }, [ChatMassage, consverSession, selectOtherQueryTicketID]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[2px]">
      <div className="relative bg-white  dark:bg-gray-800 w-full max-w-3xl h-[60vh] rounded-lg shadow-lg flex flex-col p-4 px-9 pt-9">
        <button
          onClick={onClose}
          className="absolute top-2 right-2  text-gray-600 dark:text-white text-xl font-bold"
        >
          <IoClose size={25} />
        </button>
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {OTmessages?.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`flex ${msg.system_message ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-xs p-3  break-words rounded-lg ${msg.system_message
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
                  }`}
              >
                {msg.type === "text" ? (
                  <p>{msg.content}</p>
                ) : (
                  <>
                    <img
                      src={msg.content}
                      alt="preview"
                      className="rounded-lg mb-2"
                      onClick={() => {
                        setIsOpenImage(true);
                        setImageUrl(msg.content);
                      }}
                    />
                    {msg.text && <p>{msg.text}</p>}
                    <ImagePreviewModal
                      isOpen={isOpenImge}
                      imgeUrl={ImageUrl}
                      onclose={() => setIsOpenImage(false)}
                    />
                  </>
                )}
                <span className="text-xs block mt-1 text-right opacity-70">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {ticketStatus === "pending" && (
          <div className="flex flex-col gap-2 pt-4 border-t">
            {imagePreview && (
              <div className="relative w-32">
                <img src={imagePreview} alt="preview" className="rounded" />
                <button
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 py-0.5 rounded"
                  onClick={() => {
                    setImagePreview("");
                    const fileInput = document.querySelector(
                      'input[type="file"]'
                    ) as HTMLInputElement;
                    if (fileInput) fileInput.value = "";
                  }}
                >
                  ✕
                </button>
              </div>
            )}
            {write && (
              <div className="flex items-center gap-2 dark:text-white">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm"
                />
              </div>
            )}

            {write && (
              <div className="flex items-center gap-2 dark:text-white">
                {/* <input
                  type="text"
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                /> */}
                <textarea
                  rows={1}
                  className="max-w-[90%] sm:w-full border rounded px-3 py-2 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             resize-none max-h-[100px] overflow-y-auto
             scrollbar-none [&::-webkit-scrollbar]:hidden"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    e.target.style.height = "auto"; // reset
                    const newHeight = Math.min(e.target.scrollHeight, 100);
                    e.target.style.height = newHeight + "px"; // grow until 100px
                  }}
                />

                <button
                  onClick={handleSend}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUIModal;
