import React from "react";
import { useSelector } from "react-redux";

const ChatCard = ({ chatName, members, isGroupChat }) => {
  const user = useSelector((store) => store.user);
  let groupChatAvatars;
  let chatAvatar;
  if (isGroupChat && members) {
    groupChatAvatars = members.filter((member) => member._id != user._id);
  } else {
    chatAvatar = members.filter((member) => member._id != user._id);
  }
  return (
 <>
     <div className="w-full rounded-md  p-2 h-20 flex gap-x-0.5 hover:bg-gray-400 border-b border-gray-400">
      <div className="w-[25%] px-1">
        {!isGroupChat ? (
          <div className="relative w-full h-full p-1">
            <img src={chatAvatar[0]?.photoURL} alt="chat-image" className="rounded-full w-12 h-12 " />
          </div>
        ) : (
          <div className="relative flex w-full h-full">
             {groupChatAvatars.slice(0, 2).map((avatar, index) => (
              <img
                key={index}
                src={avatar?.photoURL}
                alt={`Group Avatar ${index + 1}`}
                className={`rounded-full w-12 h-12 ${
                  index === 1 ? "-ml-4" : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-start">
        <span className="font-semibold text-xl text-neutral-700">
          {chatName}
        </span>
      </div>
    </div>
   
 </>
  );
};

export default ChatCard;
