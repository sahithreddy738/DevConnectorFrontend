import React from "react";
import { useSelector } from "react-redux";
import { DATE_OPTIONS } from "../utils/constants";

const Messages = () => {
  const messages = useSelector((store) => store.message);
  const user = useSelector((store) => store.user);
  if (messages.length === 0) return (
    <div className="w-full h-full flex flex-col gap-1 px-2 py-2  rounded-md hide-scrollbar">
        <span className="text-center font-semibold text-4xl md:text-2xl">Start Messaging</span>
    </div>
  );
  return (
    <div className="w-full h-full flex flex-col gap-1 px-2 py-2  rounded-md hide-scrollbar">
      {messages?.map((message) =>
        message?.sender?._id === user?._id ? (
          <div className="w-auto  flex flex-wrap bg-sky-300 font-semibold rounded-md p-1 self-end">
            <p className="text-md">
              {message?.message}
              <span className="ml-1 text-xs">
                {new Date(message?.createdAt).toLocaleString(
                  "en-US",
                  DATE_OPTIONS
                )}
              </span>
            </p>
          </div>
        ) : (
          <div className="w-auto  flex flex-col gap-0.5 font-semibold bg-green-300 rounded-md p-1 self-start">
            <span className="text-xs text-purple-800">
              {message?.sender?.firstName}
            </span>
            <div className="flex gap-1">
            <div className="flex flex-wrap text-md">
              {message?.message}
            </div>
            <span className="ml-1 text-xs self-center">
                {new Date(message?.createdAt).toLocaleString(
                  "en-US",
                  DATE_OPTIONS
                )}
              </span>
               </div> 
          </div>
        )
      )}
    </div>
  );
};

export default Messages;
