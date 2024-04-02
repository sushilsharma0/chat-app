import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../hooks/useGetMessage";

function Messages() {
  const { loading, messages } = useGetMessage();

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length === 0 && (
        <p>send message to start conservation</p>
      )}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
}

export default Messages;
