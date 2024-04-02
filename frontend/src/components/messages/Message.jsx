import React from "react";
import useConservation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContex";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConservation();
  const date = new Date(message.createdAt).toLocaleTimeString();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePicture
    : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? "bg-sky-500" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="tailwind css chat bubble component" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {date}
      </div>
    </div>
  );
}

export default Message;
