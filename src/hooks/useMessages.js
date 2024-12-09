import { useDispatch } from "react-redux";
import { GET_MESSAGES } from "../utils/constants";
import { addMessages, removeMessages } from "../utils/slices/messageSlice";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";


const useMessages = (messageRef) => {
  const { chatId } = useParams();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const prevChatIdRef = useRef(chatId);
  const isFetchingRef = useRef(false);
  const fetchMessages = async () => {
    try {
      isFetchingRef.current = true;
      const res = await axios.get(
        `${GET_MESSAGES}${chatId}?page=${page}&limit=20`,
        {
          withCredentials: true,
        }
      );

      dispatch(addMessages(res?.data?.data));
    } catch (err) {
      console.log(err);
    } finally {
      isFetchingRef.current = false;
    }
  };
  const handleScroll = () => {
    if (messageRef.current.scrollTop === 0 && !isFetchingRef.current) {
      setPage(page+1);
    }
  };

  useEffect(() => {
    if (page === 1 && messageRef.current) {
      messageRef.current.scrollTop =
        messageRef.current.scrollHeight;
    }
  }, [page, messageRef]);
  useEffect(() => {
    const container = messageRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, messageRef]);

  useEffect(() => {
    const currentChatId = chatId?.toString();
    const previousChatId = prevChatIdRef.current?.toString();
  
    if (previousChatId !== currentChatId) {
      dispatch(removeMessages());
      prevChatIdRef.current = currentChatId; 
      setPage(1);
    } else {
      fetchMessages(page);
    }
  }, [chatId, page]);
};

export default useMessages;
