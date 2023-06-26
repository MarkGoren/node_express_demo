import Chat from "../models/chat.model.js";
import SocketIO from "../socket.js";

export class ChatController {
  static async addMessage(req, res) {
    const userInfo = JSON.parse(req.cookies.userInfo);
    const dateTime = Date(Date.now());
    const message = req.body.message;
    const newMessage = await Chat.create({
      message: message,
      username: userInfo.username,
      dateTime: dateTime,
    });
    if (!newMessage) return res.status(417).json("something went wrong");
    SocketIO.getIo().emit("posts", {
      action: "message sent",
      post: newMessage,
    });
    return res.status(200).json("message sent");
  }

  static async getAll(req, res) {
    const allMessages = await Chat.find();
    return res.status(200).json(allMessages);
  }
}
