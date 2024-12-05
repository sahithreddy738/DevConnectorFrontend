import React from "react";

import { useSelector } from "react-redux";

import ChatCard from "./ChatCard";
import GroupChatModel from "./GroupChatModel";
import Spinner from "./Spinner";

const Chats = () => {
  const chatsData = useSelector((store) => store.chat.chats);
  return (
    <div className="w-full max-h-full h-[100vh] hide-scrollbar p-2 bg-white rounded-md">
      <div className="flex justify-between hide-scrollbar p-1 mb-3">
        <span className="text-xl font-semibold">Chats</span>
        <GroupChatModel />
      </div>
      {chatsData && chatsData?.data?.length > 0 ? (
        <div className="w-[100%]  px-1 flex flex-col gap-y-0.5">
          {chatsData?.data.map((chat) => (
            <ChatCard
              key={chat._id}
              chatId={chat._id}
              chatName={chat.chatName}
              members={chat.members}
              isGroupChat={chat.isGroupChat}
            />
          ))}
        </div>
      ) : (
        <div className="w-[90%] mx-auto p-1 ">
           <Spinner />
        </div>
      )}
    </div>
  );
};

export default Chats;
