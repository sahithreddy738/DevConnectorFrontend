import axios from "axios";
import React, { useEffect } from "react";
import { CONNECTIONS_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionsSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate=useNavigate();
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
        <h1 className="text-3xl">No Requests Found</h1>
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
    <>
      <h1 className="text-center text-3xl">Connections</h1>
      <div className="flex flex-row mt-2">
        {connections.map((connection) => {
          return (
            <div
              className="w-[30%] bg-base-300 ml-4 flex flex-row justify-between rounded-md items-center px-4 py-4 mb-2"
              key={connection._id}
            >
              <div className="w-20 h-20">
                <img
                  className="rounded-full object-fill"
                  src={connection.photoURL}
                  alt="user-connection-photo"
                ></img>
              </div>
              <div>
                <h1>{connection.firstName + " " + connection.lastName}</h1>
                <h1>{connection.age && connection?.age + " " + connection.gender}</h1>
              </div>
              <div>
                <button className="bg-blue-500 rounded-lg py-2 px-4 text-white">View Profile</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
