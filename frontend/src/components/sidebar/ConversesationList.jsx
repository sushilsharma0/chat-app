import React from "react";
import Conversation from "./Conversation";
import useConservations from "../../hooks/useConservations";
import { getEmoji } from "../../utils/emojis";

const ConversesationList = () => {
  const { loading, conservations } = useConservations();

  if (!conservations) {
    // Handle case where conservations is undefined
    return <span className="loading loading-spinner mx-auto"></span>;
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conservations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getEmoji()}
          lastIndex={index === conservations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default ConversesationList;
