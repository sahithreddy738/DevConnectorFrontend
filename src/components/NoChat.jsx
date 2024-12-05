import React from "react";
import CHAT_IMAGE from "/chattingImage.png";

const ChatHome = () => {
  return (
    <div className="w-full p-2  max-h-full h-[100vh] hide-scrollbar  bg-white rounded-md">
      <div className="mt-10 flex flex-col items-center gap-y-6 w-[70%] mx-auto">
        <img
          src={CHAT_IMAGE}
          alt="chat-home-image"
          className="rounded-md w-[70%]"
        />
        <span className="font-semibold text-2xl text-center">
          Select Chat to Start Chatting
        </span>
      </div>
    </div>
  );
};

export default ChatHome;
