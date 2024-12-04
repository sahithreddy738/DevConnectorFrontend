import axios from "axios";
import React, { useEffect } from "react";
import { GET_CHATS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addChats } from "../utils/slices/chatSlice";
import ChatCard from "./ChatCard";
import GroupChatModel from "./GroupChatModel";

const Chats = () => {
  const dispatch = useDispatch();
  const chatsData = useSelector((store) => store.chat.chats);
  const fetchChats = async () => {
    try {
      const chatData = await axios.get(GET_CHATS, { withCredentials: true });
      dispatch(addChats(chatData?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="w-full p-2 bg-white rounded-md">
      <div className="flex justify-between p-1 mb-3">
        <span className="text-xl font-semibold">Chats</span>
        <GroupChatModel />
      </div>
      {chatsData && chatsData?.data?.length > 0 ? (
        <div className="w-[100%]  px-1 flex flex-col gap-y-0.5">
          {chatsData?.data.map((chat) => (
            <ChatCard
              key={chat._id}
              chatName={chat.chatName}
              members={chat.members}
              isGroupChat={chat.isGroupChat}
            />
          ))}
        </div>
      ) : (
        <div className="w-[90%] mx-auto p-1 ">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
