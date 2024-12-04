import React, { useState } from "react";
import SearchFriends from "./SearchFriends";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { POST_GROUPCHAT } from "../utils/constants";
import { addChats } from "../utils/slices/chatSlice";

const GroupChatForm = ({ closeModal }) => {
  const [chatName, setChatName] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
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
      toast.success("Group Created Successfully");
      setErrorMessage("");
      setUsers([]);
      closeModal();
    } catch {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <div className="w-full mt-5 mb-2">
      <div className="flex flex-col gap-4 w-full justify-center ">
        <div className="flex flex-col gap-2">
          <label for="chat-name" className="font-semibold">
            Chat Name
          </label>
          <input
            id="chat-name"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="rounded-md p-2 border-2 border-gray-500"
            type="text"
            placeholder="Enter chat name"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <span className="font-medium">Selected Chat Members</span>
          {users.length === 0 ? (
            <span className="text-center p-2 w-[40%] mx-auto font-medium bg-orange-300 rounded-full">
              Add Chat Member
            </span>
          ) : (
            <div className="flex gap-2 flex-wrap w-full">
              {users &&
                users.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-shrink-0 w-auto h-12 p-1 gap-4 items-center bg-emerald-500 rounded-full"
                  >
                    <div className="flex gap-2 py-1 items-center">
                      <img
                        src={user?.photoURL}
                        className="rounded-full w-8 h-8"
                      ></img>
                      <span className="font-semibold">{user?.firstName}</span>
                    </div>
                    <X
                      className="h-5 w-5 hover:cursor-pointer"
                      onClick={() => removeUser(user._id)}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
        {errorMessage.length > 0 && (
          <span className="text-red-500 py-1 px-2 text-start text-lg rounded-full w-[70%]">
            {errorMessage}
          </span>
        )}
        <button
          onClick={onSubmit}
          className="bg-blue-700 p-2 text-white rounded-lg w-[50%] text-center"
        >
          Create Group Chat
        </button>
      </div>
      <SearchFriends onHandle={addUser} />
    </div>
  );
};

export default GroupChatForm;
