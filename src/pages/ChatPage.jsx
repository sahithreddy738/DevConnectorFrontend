import React, { useEffect } from "react";
import Chats from "../components/Chats";
import { Outlet, useLocation } from "react-router-dom";
import { GET_CHATS } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addChats } from "../utils/slices/chatSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
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
  }, [location]);
  return (
    <div className="w-full h-full flex px-1 gap-1">
      <div className="w-[30%]">
        <Chats />
      </div>
      <div className="w-[70%] ">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatPage;
