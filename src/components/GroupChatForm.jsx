import React, { useState } from "react";
import SearchFriends from "./SearchFriends";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { POST_GROUPCHAT } from "../utils/constants";
import { addChats } from "../utils/slices/chatSlice";
import { useNavigate } from "react-router-dom";

const GroupChatForm = ({ closeModal }) => {
  const [chatName, setChatName] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const addUser = (user) => {
    if (!users.some((u) => u._id === user._id)) {
      setUsers((prevUsers) => [...prevUsers, user]);
    }
  };
  const removeUser = (id) => {
    const filterUsers = users.filter((user) => user._id !== id);
    setUsers(filterUsers);
  };
  const onSubmit = async () => {
    const userIds = users.map((user) => user._id);
    console.log(userIds);
    if (userIds.length < 2) {
      setErrorMessage("Required min of 2 users to create group");
      return;
    }
    try {
      const res = await axios.post(
        POST_GROUPCHAT,
        { chatName, users: userIds },
        { withCredentials: true }
      );
      dispatch(addChats(res?.data?.data));
      navigate(`/chats/${res?.data?.data[0]?._id}`);
      toast.success("Group Created Successfully");
      setErrorMessage("");
      setUsers([]);
      closeModal();
    } catch {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <div className="w-full mt-8 md:mt-5 mb-2">
      <div className="flex flex-col gap-y-2 md:gap-y-4 w-full justify-center ">
        <div className="flex flex-col gap-y-2 md:gap-y-2">
          <label for="chat-name" className="font-semibold md:text-base text-xl">
            Chat Name
          </label>
          <input
            id="chat-name"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="rounded-md text-lg font-semibold p-2 border-2 border-gray-500"
            type="text"
            placeholder="Enter chat name"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <span className="font-medium text-xl md:text-base">Selected Chat Members</span>
          {users.length === 0 ? (
            <span className="text-center p-2 w-[50%] md:w-[40%] mx-auto font-semibold bg-orange-300 rounded-full text-base">
              Add Chat Member
            </span>
          ) : (
            <div className="flex gap-2 flex-wrap w-full">
              {users &&
                users.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-shrink-0 w-auto h-16 md:h-12  px-2 py-1 md:p-1 gap-4 items-center bg-emerald-500 rounded-full"
                  >
                    <div className="flex gap-x-3 md:gap-2 py-1 items-center">
                      <img
                        src={user?.photoURL}
                        className="rounded-full w-12 h-12 md:w-8 md:h-8"
                      ></img>
                      <span className="font-semibold md:text-base text-2xl">{user?.firstName}</span>
                    </div>
                    <X
                      className="h-7 w-7 md:h-5 md:w-5 hover:cursor-pointer"
                      onClick={() => removeUser(user._id)}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
        {errorMessage.length > 0 && (
          <span className="text-red-500 py-1 px-2 text-start text-xl md:text-lg rounded-full w-[70%]">
            {errorMessage}
          </span>
        )}
        <button
          onClick={onSubmit}
          className="bg-blue-700 text-xl md:text-base md:my-0 my-2 p-2 text-white rounded-lg w-full md:w-[50%] text-center"
        >
          Create Group Chat
        </button>
      </div>
      <SearchFriends onHandle={addUser} connections={connections} />
    </div>
  );
};

export default GroupChatForm;
