import express from "express";
import { Server } from "socket.io";
import http from "http";
import initializeSockets from "./sockets";
import connectDB from "./db";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

initializeSockets(io);

io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

connectDB();

export default server;
