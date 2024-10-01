import axios from "axios";
import React, { useEffect } from "react";
import { CONNECTION_REQUEST_URL, REVIEW_REQUEST_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/slices/requestsSlice";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleReviewRequest = async (status, _id) => {
    try {
      await axios.post(
        REVIEW_REQUEST_URL + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };
  const getRequests = async () => {
    try {
      const res = await axios.get(CONNECTION_REQUEST_URL, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.receivedRequests));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  if (requests.length === 0)
    return (
      <div className="flex flex-col text-center space-y-2">
        <h1 className="text-3xl">No Requests Found</h1>;
        <div className="flex flex-row gap-2 justify-center items-center">
          <p>Want to Know New Users?</p>
          <button
            className="bg-blue-500 px-4 py-2 text-white rounded-lg"
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </div>
    );
  return (
    <div className="h-[80%] w-full">
      <h1 className="text-center text-3xl font-bold">Connection Requests</h1>
      <div className="flex sm:flex-row flex-col mt-6 sm:flex-wrap w-full">
        {requests.map((request) => {
          return (
            <div
              className="w-[95%] sm:w-[40%] lg:w-[25%] gap-2 sm:gap-2 flex-shrink bg-stone-200 mx-2 sm:mx-3 flex flex-row justify-between  rounded-xl items-center px-4 py-4 mb-2 "
              key={request.fromUserId._id}
            >
            <div className="w-[20%] sm:w-[25%] lg:w-[25%] h-20">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={request.fromUserId.photoURL}
                  alt="user-connection-photo"
                ></img>
              </div>
              <div className="w-[50%] sm:w-[45%] lg:w-[40%] break-words">
                <h1 className="text-lg font-semibold">
                  {request.fromUserId.firstName +
                    " " +
                    request.fromUserId.lastName}
                </h1>
                <h1 className="text-base font-semibold">
                  {request.fromUserId.age &&
                    request.fromUserId.age + " " + request.fromUserId.gender}
                </h1>
              </div>
              <div className="w-[25%] sm:w-[30%] lg:[35%] flex flex-wrap justify-center lg:flex-grow sm:flex-row  sm:gap-2">
                <button
                  className="bg-red-500 rounded-lg py-2 px-4 text-white"
                  onClick={() => handleReviewRequest("rejected", request._id)}
                >
                  reject
                </button>
                <button
                  className="bg-blue-500 rounded-lg py-2 px-4  text-white"
                  onClick={() => handleReviewRequest("accepted", request._id)}
                >
                  accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
