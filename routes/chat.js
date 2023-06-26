import express from "express";
import { ChatController } from "../controllers/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post("/addMessage", (req, res) => {
  return ChatController.addMessage(req, res);
});

chatRouter.get("/getAll", (req, res) => {
  return ChatController.getAll(req, res);
});

export default chatRouter;
