import mongoose from "mongoose";

const chatModel = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  dateTime: {
    type: Date,
    required: true,
  },
});

const Chat = mongoose.model("chat", chatModel);
export default Chat;
