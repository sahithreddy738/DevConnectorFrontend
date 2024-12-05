import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_CHAT_DETAILS,
  GET_MESSAGES,
  POST_MESSAGE,
} from "../utils/constants";
import { addMessages, removeMessages } from "../utils/slices/messageSlice";
import { setSelectedChat } from "../utils/slices/chatSlice";
import { useParams } from "react-router-dom";
import Messages from "./Messages";
import { Send } from "lucide-react";

const ChatMessage = () => {
  const [inputMessage, setInputMessage] = useState("");
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const user = useSelector((store) => store.user);
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const fetchMessages = async () => {
    try {
      const res = await axios.get(GET_MESSAGES + chatId, {
        withCredentials: true,
      });
      dispatch(addMessages(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchChatDetails = async () => {
    try {
      const res = await axios.get(GET_CHAT_DETAILS + chatId, {
        withCredentials: true,
      });
      dispatch(setSelectedChat(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMessages();
    return () => dispatch(removeMessages());
  }, [chatId]);
  useEffect(() => {
    fetchChatDetails();
  }, [chatId]);
  const postChatDetails = async () => {
    try {
        console.log({chatId,message:inputMessage})
      const res = await axios.post(
        POST_MESSAGE,
        {
            chatId:chatId,
          message: inputMessage,
        },
        { withCredentials: true }
      );
      dispatch(addMessages([res?.data?.data]));
      setInputMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") postChatDetails();
  };

  if (!selectedChat) return <h1>Loading</h1>;
  const { chatName, members, isGroupChat } = selectedChat;
  let groupChatAvatars;
  let chatAvatar;
  if (selectedChat.isGroupChat && selectedChat.members) {
    groupChatAvatars = members?.filter((member) => member?._id !== user?._id);
  } else {
    chatAvatar = members?.filter((member) => member?._id !== user?._id);
  }
  return (
    <div className="w-full p-2 max-h-full h-[100vh] hide-scrollbar bg-white rounded-md">
      <div className="flex gap-x-3 w-full h-[10%] px-2 py-2 items-center hover:cursor-pointer shadow-sm rounded-lg">
        {!isGroupChat ? (
          <div className="relative w-[10%] h-full p-1">
            <img
              src={chatAvatar && chatAvatar[0]?.photoURL}
              alt="chat-image"
              className="rounded-full w-12 h-12 "
            />
          </div>
        ) : (
          <div className="relative flex w-[10%] h-full">
            {groupChatAvatars?.slice(0, 2).map((avatar, index) => (
              <img
                key={index}
                src={avatar?.photoURL}
                alt={`Group Avatar ${index + 1}`}
                className={`rounded-full w-12 h-12 ${
                  index === 1 ? "-ml-4" : ""
                }`}
              />
            ))}
          </div>
        )}
        <span className="font-semibold text-xl">{chatName}</span>
      </div>
      <div className="h-[83%] w-full">
        <Messages />
      </div>
      <div className="flex items-center h-[7%] w-full justify-between">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          px-2
          py-1
          placeholder="Enter Message"
          onKeyDown={onKeyDown}
          className=" rounded-l-full font-semibold border border-gray-400 h-full w-[92%] px-3 py-2"
        />
        <button
          onClick={postChatDetails}
          className="w-[8%]  px-2 py-1 rounded-r-full h-full bg-green-500  "
        >
          <Send className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatMessage;
