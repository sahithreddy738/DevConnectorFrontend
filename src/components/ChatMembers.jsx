import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import SearchFriends from "./SearchFriends";
import axios from "axios";
import { ADD_MEMBER, DELETE_MEMBER } from "../utils/constants";
import { toast } from "react-toastify";
import {
  deleteMemberSelectedChat,
  updateMemberSelectedChat,
} from "../utils/slices/chatSlice";

const ChatMembers = () => {
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  if (!selectedChat) return <Spinner />;
  let groupAdmin;
  if (Object.keys(selectedChat).includes("groupAdmin"))
    groupAdmin = selectedChat.groupAdmin;
  const { chatName, isGroupChat, members } = selectedChat;
  const filterConnections = connections.filter(
    (connection) => !members.some((member) => member._id === connection._id)
  );
  const addUserToGroup = async (user) => {
    try {
      const res = await axios.patch(
        ADD_MEMBER,
        { chatId: selectedChat._id, userId: user._id },
        { withCredentials: true }
      );
      dispatch(updateMemberSelectedChat(res?.data?.data));
      toast.success("Added to group successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const removeUserFromGroup = async (user) => {
    try {
      const res = await axios.patch(
        DELETE_MEMBER,
        { chatId: selectedChat._id, userId: user._id },
        { withCredentials: true }
      );
      dispatch(deleteMemberSelectedChat(res?.data?.data));
      toast.success("Deleted from group successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col gap-y-3 md:gap-y-1">
      <span className="font-semibold text-2xl md:text-xl">
        Members 
      </span>
      <div className="border w-full border-black"></div>
      <div className="w-full flex flex-col gap-y-8 md:gap-y-1">
        {members?.map((member) =>
        (
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-x-4 md:gap-x-3 items-center w-[80%]">
                <img
                  src={member?.photoURL}
                  className="rounded-full w-14 h-14"
                />
                <span className="font-semibold text-xl md:text-base">
                  {member?.firstName + " " + member?.lastName}
                </span>
              </div>
              {isGroupChat ? (
                <>
                  {groupAdmin && groupAdmin === user?._id ? (
                    <button
                      className="w-[20%] md:w-[10%]  bg-red-500 text-white font-semibold rounded-md h-10 text-base"
                      onClick={() => removeUserFromGroup(member)}
                    >
                      Remove
                    </button>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          )
        )}
      </div>
   {
     isGroupChat && (   <div className="w-full p-3 md:w-[50%] text-center md:p-2 bg-blue-800 text-white rounded-md mt-4 text-md md:text-base">
      <span className="font-semibold">Only Group Admin can add or delete Members to Group</span>
   </div>)
   }
      {isGroupChat && groupAdmin && groupAdmin === user?._id ? (
        <SearchFriends
          connections={filterConnections}
          onHandle={addUserToGroup}
        />
      ) : (
     <></>
      )}
    </div>
  );
};

export default ChatMembers;
