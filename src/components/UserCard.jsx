import React from "react";
import { REQUEST_SENT_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/slices/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSentRequest = async (status, userId) => {
    try {
      await axios.post(
        REQUEST_SENT_URL + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 w-80 mx-auto  h-[75%] shadow-xl mt-2">
      <figure>
        <img src={user?.photoURL} alt="user-photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        <p>{user?.about}</p>
        <div className="card-actions justify-center mt-2">
          <button
            className="btn bg-pink-700"
            onClick={() => handleSentRequest("ignored", user?._id)}
          >
            Ignore
          </button>
          <button
            className="btn bg-indigo-600"
            onClick={() => handleSentRequest("interested", user?._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
