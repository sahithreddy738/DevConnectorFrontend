import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import GroupChatForm from "./GroupChatForm";

const GroupChatModel = () => {
  const [isModelOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <button
        onClick={openModal}
        className="bg-slate-600 rounded-md p-2 text-white text-sm"
      >
        <div className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span className="font-semibold text-base">New Group chat</span>
        </div>
      </button>
      {isModelOpen && (
        <div  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 hide-scrollbar">
          <div  className="bg-white mx-5 rounded-lg px-4 py-5 md:p-6 w-full max-w-md md:max-w-xl max-h-[90vh] hide-scrollbar">
             <div className="flex justify-between w-full items-center">
                <span className="text-xl md:text-lg font-semibold text-neutral-700">Group Chat</span>
                <X onClick={closeModal} className="w-5 h-5 md:w-5 md:h-5 hover:cursor-pointer"/>
             </div>
             {/* <div className="border border-gray-400 w-full"></div> */}
             <GroupChatForm closeModal={closeModal}/>
          </div>
          <div onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
};

export default GroupChatModel;
