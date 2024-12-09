import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DATE_OPTIONS } from "../utils/constants";
import { background_images } from "../utils/constants";
import useMessages from "../hooks/useMessages";


const Messages = () => {
  const messages = useSelector((store) => store.message);
  const user = useSelector((store) => store.user);
  const messageRef = useRef(null);
  const [intialBgImage, setInitialBgImage] = useState("");
  useMessages(messageRef);
  useEffect(() => {
    const randomImage =
      background_images[Math.floor(Math.random() * background_images.length)];
    setInitialBgImage(randomImage);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col gap-1 px-2 py-2 rounded-md hide-scrollbar"
      ref={messageRef}
      style={{
        backgroundImage: `url(${intialBgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {messages.length === 0 ? (
        <span className="text-center font-semibold text-4xl md:text-2xl text-white bg-blue-800 rounded-md w-auto">
          Start Messaging
        </span>
      ) : (
        messages.map((message) =>
          message?.sender?._id === user?._id ? (
            <div
              key={message._id}
              className="w-auto flex flex-wrap bg-sky-300 font-semibold rounded-md p-1 self-end"
            >
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
            <div
              key={message._id}
              className="w-auto flex flex-col gap-0.5 font-semibold bg-green-300 rounded-md p-1 self-start"
            >
              <span className="text-xs text-purple-800">
                {message?.sender?.firstName}
              </span>
              <div className="flex gap-1">
                <div className="flex flex-wrap text-md">{message?.message}</div>
                <span className="ml-1 text-xs self-center">
                  {new Date(message?.createdAt).toLocaleString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </span>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default Messages;
