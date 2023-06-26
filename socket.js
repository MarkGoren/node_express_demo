import { Server } from "socket.io";

let io;

export default class SocketIO {
  static init(httpServer) {
    io = new Server(httpServer, {
      cors: { origin: "http://localhost:3000" },
    });
    return io;
  }

  static getIo() {
    if (!io) throw new Error("io not init!");
    return io;
  }
}
