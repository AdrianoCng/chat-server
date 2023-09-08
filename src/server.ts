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

io.on("connection", () => {
    console.log("User Connected");
});

io.use((socket, next) => {
    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });

    next();
});

connectDB();

export default server;
