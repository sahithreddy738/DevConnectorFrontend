import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { ArrowLeft, Pen, PenLine } from "lucide-react";
import ChatMembers from "./ChatMembers";
import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_CHAT_NAME } from "../utils/constants";
import { updateSelectedChat } from "../utils/slices/chatSlice";

const ChatDetails = ({ handleClick }) => {
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const user = useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState(false);
  const [inputChatName, setInputChatName] = useState(selectedChat.chatName);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  if (!selectedChat) return <Spinner />;
  const { chatName, members, isGroupChat } = selectedChat;
  let groupChatAvatars;
  let chatAvatar;
  if (!chatName && !members && !isGroupChat) return;
  if (isGroupChat && members) {
    groupChatAvatars = members.filter((member) => member?._id !== user?._id);
  } else {
    chatAvatar = members.filter((member) => member?._id !== user?._id);
  }
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);
  const enableEditing = () => {
    setIsEditing(true);
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  const updateChatName = async () => {
    if (inputChatName === selectedChat.chatName) {
      setIsEditing(false);
      return;
    }
    try {
      const res = await axios.patch(
        UPDATE_CHAT_NAME,
        { chatName: inputChatName, chatId: selectedChat?._id },
        { withCredentials: true }
      );
      dispatch(updateSelectedChat(inputChatName));
      setIsEditing(false);
      toast.success("Updated chat name");
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateChatName();
    }
  };
  return (
    <div className="w-full px-3 py-2 max-h-full flex flex-col gap-y-8 h-[100vh] hide-scrollbar bg-white rounded-md">
      <div className="w-full flex  p-2 justify-between shadow-sm">
        <div
          className="p-2 rounded-full bg-gray-300 cursor-pointer"
          onClick={() => handleClick()}
        >
          <ArrowLeft className="md:w-6 md:h-6 h-8 w-8" />
        </div>
      </div>
      <div className="flex flex-col gap-y-4 items-center">
        <div className="px-1">
          {!isGroupChat ? (
            <div className="relative w-full h-full p-1">
              <img
                src={chatAvatar[0]?.photoURL}
                alt="chat-image"
                className="rounded-full w-24 h-24 "
              />
            </div>
          ) : (
            <div className="relative flex w-full h-full">
              {groupChatAvatars.slice(0, 3).map((avatar, index) => (
                <img
                  key={index}
                  src={avatar?.photoURL}
                  alt={`Group Avatar ${index + 1}`}
                  className={`rounded-full w-24 h-24 ${
                    index === 1 ? "-ml-4" : ""
                  }`}
                />
              ))}
            </div>
          )}{" "}
        </div>
        <div className="flex gap-x-2 items-center ">
          {isEditing ? (
            <input
              className="font-semibold  text-4xl"
              ref={inputRef}
              value={inputChatName}
              onChange={(e) => setInputChatName(e.target.value)}
              onBlur={disableEditing}
              onKeyDown={handleKeyDown}
            ></input>
          ) : (
            <span className="font-semibold text-4xl">
              {selectedChat.chatName}
            </span>
          )}
          <PenLine
            className="w-6 h-6 mt-2 cursor-pointer"
            onClick={enableEditing}
          />
        </div>
      </div>
      <ChatMembers />
    </div>
  );
};

export default ChatDetails;
