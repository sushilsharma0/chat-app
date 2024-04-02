import React, { useState } from "react";
import useConservation from "../zustand/useConversation";
import toast from "react-hot-toast";

function useSendMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConservation } = useConservation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/messages/send/${selectedConservation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }), // Sending message as JSON string
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error sending message");
      }

      const newMessage = await response.json();
      // Updating messages state with the new message
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message); // Displaying error using toast
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
}

export default useSendMessages;
