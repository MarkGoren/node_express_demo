import express from "express";
import { UsersController } from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res) => {
  return await UsersController.addUser(req, res);
});

usersRouter.post("/login", async (req, res) => {
  return await UsersController.login(req, res);
});

export default usersRouter;
