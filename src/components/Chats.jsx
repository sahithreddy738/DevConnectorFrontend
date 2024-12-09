import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ChatCard from "./ChatCard";
import GroupChatModel from "./GroupChatModel";
import Spinner from "./Spinner";
import { Search, X } from "lucide-react";
import SearchFriends from "./SearchFriends";
import axios from "axios";
import { ADD_CHAT } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addChats } from "../utils/slices/chatSlice";

const Chats = () => {
  const chatsData = useSelector((store) => store.chat.chats);
  const connections = useSelector((store) => store.connections);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addChat = async (user) => {
    try {
      const res = await axios.post(
        ADD_CHAT + user._id,
        {},
        { withCredentials: true }
      );
      dispatch(addChats(res.data.data));
      navigate(`/chats/${res.data.data._id}`);
      setIsSideNavOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full max-h-full h-[100vh] hide-scrollbar p-2 bg-white rounded-md flex flex-col gap-y-4 md:gap-y-2">
      <div
        className="bg-slate-200 w-[50%] text-base md:w-[40%] rounded-md p-2 flex gap-x-2 font-semibold items-center justify-between cursor-pointer"
        onClick={() => setIsSideNavOpen(true)}
      >
        <button >Search Chats</button>
        <Search className="h-4 w-4" />
      </div>
      <div className="flex justify-between hide-scrollbar p-1 mb-3">
        <span className="md:text-xl font-semibold text-2xl">Chats</span>
        <GroupChatModel />
      </div>
      {chatsData && chatsData?.length > 0 ? (
        <div className="w-[100%]  px-1 flex flex-col gap-y-0.5">
          {chatsData?.map((chat) => (
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
      {isSideNavOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="bg-white w-[90%] max-w-sm h-full p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl md:text-lg font-semibold">Search Chats</span>
              <X
                className="cursor-pointer h-6 w-6  text-gray-600"
                onClick={() => setIsSideNavOpen(false)}
              />
            </div>
            <SearchFriends connections={connections} onHandle={addChat} />
          </div>
          <div className="flex-1" onClick={() => setIsSideNavOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default Chats;
