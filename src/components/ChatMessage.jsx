import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_MESSAGES,
  POST_MESSAGE,
} from "../utils/constants";
import { addMessages, removeMessages } from "../utils/slices/messageSlice";
import {useParams } from "react-router-dom";
import Messages from "./Messages";
import socket from "../utils/socket";
import { addNotifications } from "../utils/slices/notificationsSlice";
import { Eye, Send } from "lucide-react";

const ChatMessage = ({ handleClick }) => {
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

  useEffect(() => {
    fetchMessages();
    return () => dispatch(removeMessages());
  }, [chatId]);
  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to server, Socket ID:", socket.id);
    });
    socket.emit("join room", chatId);
    socket.on("message recieve", (message) => {
      console.log(message);
      if (!selectedChat || selectedChat._id !== message.chat._id) {
        console.log("Message added to notifications:", message);
        dispatch(addNotifications([message]));
      } else {
        dispatch(addMessages([message]));
      }
    });

    return () => {
      socket.off("connection");
      socket.off("message recieve");
      socket.off("join room");
    };
  }, [chatId, selectedChat]);
  const postChatDetails = async () => {
    try {
      const res = await axios.post(
        POST_MESSAGE,
        {
          chatId: chatId,
          message: inputMessage,
        },
        { withCredentials: true }
      );
      const savedMessage = res?.data?.data;
      socket.emit("message", savedMessage);
      dispatch(addMessages([savedMessage]));
      setInputMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      postChatDetails();
    }
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
      <div className="flex justify-between w-full h-[10%] md:h-[10%] p-2 md:px-2 md:py-2 items-center hover:cursor-pointer shadow-sm rounded-lg">
        <div className="flex gap-x-3 w-[90%] md:w-[95%] items-center">
          {!isGroupChat ? (
            <div className="relative w-[28%] md:w-[10%] h-full p-1">
              <img
                src={chatAvatar && chatAvatar[0]?.photoURL}
                alt="chat-image"
                className="rounded-full w-14 h-14 md:w-12 md:h-12 "
              />
            </div>
          ) : (
            <div className="relative flex w-[28%] md:w-[10%] h-full">
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
          <span className="font-semibold text-2xl md:text-xl">{chatName}</span>
        </div>
        <div
          className="hover:bg-red-300 sm:w-[10%] md:w-[5%] flex items-center justify-center p-1 md:p-2 rounded-full"
          onClick={() => handleClick()}
        >
          <Eye className="h-10 w-10 md:h-4 md:w-4"/>
        </div>
      </div>
      <div className="h-[85%] md:h-[83%] w-full">
        <Messages />
      </div>
      <div className="flex items-center mt-1 h-[4%] md:h-[7%] w-full justify-between">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          px-2
          py-1
          placeholder="Enter Message"
          onKeyDown={onKeyDown}
          className=" rounded-l-full font-semibold border border-gray-400 h-full w-[86%] md:w-[92%] px-3 py-2 md:text-base text-xl"
        />
        <button
          onClick={postChatDetails}
          className="w-[14%] md:w-[8%]  px-2 py-1 rounded-r-full h-full bg-green-500"
        >
          <Send className="h-8 w-8  md:h-6 md:w-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatMessage;
