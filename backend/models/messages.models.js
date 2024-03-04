import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "senderId should be required"],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "receiverId should be required"],
    },
    message: {
      type: String,
      required: [true, "message should be required"],
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Message", messagesSchema);

export default Messages;
