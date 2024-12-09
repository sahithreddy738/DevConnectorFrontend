import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatDetails from "./ChatDetails";
import { GET_CHAT_DETAILS } from "../utils/constants";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../utils/slices/chatSlice";

const SingleChat = () => {
  const [isDetails, setIsDetails] = useState(false);
  const {chatId} = useParams();
  const location = useLocation();

  const dispatch = useDispatch();

  const fetchChatDetails = async () => {
    try {
      const res = await axios.get(GET_CHAT_DETAILS + chatId, {
        withCredentials: true,
      });
      dispatch(setSelectedChat(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChatDetails();
  }, [chatId,location]);

  const handleClick = () => {
    setIsDetails(!isDetails);
  };

  return (
    <>
      {isDetails ? (
        <ChatDetails handleClick={handleClick} />
      ) : (
        <ChatMessage handleClick={handleClick} />
      )}
    </>
  );
};

export default SingleChat;
