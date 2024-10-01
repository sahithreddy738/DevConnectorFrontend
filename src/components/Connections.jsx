import axios from "axios";
import React, { useEffect } from "react";
import { CONNECTIONS_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionsSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getConnections = async () => {
    try {
      const res = await axios.get(CONNECTIONS_URL, { withCredentials: true });
      dispatch(addConnections(res?.data?.userConnections));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);
  if (connections.length === 0)
    return (
      <div className="flex flex-col text-center space-y-2">
        <h1 className="text-3xl font-bold">No Connections Found</h1>
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
      <h1 className="text-center text-3xl font-bold ">Connections</h1>
      <div className="flex sm:flex-row flex-col mt-6 sm:flex-wrap w-full">
        {connections.map((connection) => {
          return (
            <div
              className="w-[95%] sm:w-[40%] lg:w-[30%] gap-2 sm:gap-2  bg-stone-200 mx-2 sm:mx-3 lg:ml-6 flex flex-row justify-between  rounded-xl items-center px-4 py-4  mb-2 "
              key={connection._id}
            >
              <div className="w-[20%] sm:w-[25%] lg:w-[20%] h-20">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={connection.photoURL}
                  alt="user-connection-photo"
                ></img>
              </div>
              <div className="w-[60%] sm:w-[50%] lg:w-[50%] break-words">
                <h1 className="text-lg font-semibold">
                  {connection.firstName + " " + connection.lastName}
                </h1>
                <h1 className="text-md font-semibold">
                  {connection.age && connection?.age + " " + connection.gender}
                </h1>
              </div>
              <div className="w-[20%] sm:w-[25%] lg:w-[30%]">
                <button className="bg-blue-500 rounded-lg py-2 px-4 text-white">
                  View Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
