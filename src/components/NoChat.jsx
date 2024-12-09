import React from "react";
import CHAT_IMAGE from "/chattingImage.png";

const ChatHome = () => {
  return (
    <div className="hidden md:flex md:w-full md:p-2  md:max-h-full md:h-[100vh] md:hide-scrollbar  md:bg-white md:rounded-md">
      <div className="md:mt-10 md:flex md:flex-col md:items-center md:gap-y-6 md:w-[70%] md:mx-auto">
        <img
          src={CHAT_IMAGE}
          alt="chat-home-image"
          className="md:rounded-md md:w-[70%]"
        />
        <span className="md:font-semibold md:text-2xl md:text-center">
          Select Chat to Start Chatting
        </span>
      </div>
    </div>
  );
};

export default ChatHome;
