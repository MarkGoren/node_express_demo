import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/users.js";
import productsRouter from "./routes/products.js";
import chatRouter from "./routes/chat.js";
import session from "express-session";
import cors from "cors";
import SocketIO from "./socket.js";
import * as graphqlHttp from "express-graphql";
import Schema from "./graphql/schema.js";
import QueryRoot from "./graphql/resolvers.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "mySecret",
    cookie: { secure: true },
  })
);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/chat", chatRouter);

app.use(
  "/graphql",
  graphqlHttp.graphqlHTTP({
    schema: Schema,
    rootValue: QueryRoot,
    graphiql: true,
  })
);

mongoose
  .connect("mongodb+srv://mark:mark341544@cluster0.wm0yljj.mongodb.net/", {
    dbName: "demo",
  })
  .then(() => {
    const server = app.listen(3002);
    const io = SocketIO.init(server);
    io.on("connection", (socket) => console.log("connected"));
  })
  .catch((err) => console.log(err));
