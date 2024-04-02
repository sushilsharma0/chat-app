import React, { useEffect, useState } from "react";
import useConservation from "../zustand/useConversation";

function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConservation } = useConservation();

  useEffect(() => {
    const getMessages = async () => {
        if (!selectedConservation || !selectedConservation._id) return;
      setLoading(true);
      try {
        const response = await fetch(
          `/api/messages/${selectedConservation._id}`
        );
        if (!response.ok) {
          const errorMessages = await response.text();
          throw new Error(errorMessages || "error fetching messages");
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConservation?._id) {
      getMessages();
    }
  }, [selectedConservation?._id, setMessages]);
  return { loading, messages };
}

export default useGetMessage;
