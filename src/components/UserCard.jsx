import React from "react";
import { REQUEST_SENT_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../utils/slices/feedSlice";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const userLoggedIn = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate=useNavigate();
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
    <div className="card bg-zinc-300 w-[80%] sm:w-[45%] lg:w-[30%] h-[750px] mx-auto shadow-xl mt-8">
      <figure className="h-[65%] w-full">
        <img
          className="h-full w-full object-fill"
          src={user?.photoURL}
          alt="user-photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl font-semibold">{user?.firstName + " " + user?.lastName}</h2>
        <h2 className="card-title text-2xl font-semibold">
          {user.age && user?.age + " " + user?.gender}
        </h2>
        <p className=" text-xl font-semibold">{user?.about}</p>
        {userLoggedIn._id != user._id ? (
          <div className="card-actions justify-center mt-2">
            <button
              className="btn bg-red-500 font-bold border-none"
              onClick={() => handleSentRequest("ignored", user?._id)}
            >
              Ignore
            </button>
            <button
              className="btn bg-blue-500 font-bold border-none"
              onClick={() => handleSentRequest("interested", user?._id)}
            >
              Interested
            </button>
            <button
              className="btn bg-green-500 font-bold border-none"
              onClick={() => navigate("/profile/"+user?._id) }
            >
              view profile
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserCard;
