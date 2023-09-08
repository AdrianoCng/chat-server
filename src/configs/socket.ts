import { Server } from "socket.io";
import http from "http";

import initializeSockets from "@services/index";
import app from "app";

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

export default server;
