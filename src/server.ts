import express from "express";
import { Server } from "socket.io";
import http from "http";
import initializeSockets from "./sockets";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", () => {
    console.log("User Connected");
});

initializeSockets(io);

export default server;
