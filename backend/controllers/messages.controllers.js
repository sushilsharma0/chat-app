import Conversation from "../models/conversations.models.js";
import Messages from "../models/messages.models.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participients: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participients: [senderId, receiverId],
      });
    }

    const newMessage = await Messages({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(200).json(newMessage);
  } catch (error) {
    console.log(
      "Something went wrong in send messages controller, error in send messages controller" +
        error.message
    );
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participients: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(400).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log(
      "Something went wrong in get messages controller, error in get messages controller" +
        error.message
    );
    res.status(500).json({ message: error.message });
  }
};
