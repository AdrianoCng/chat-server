import { Server } from "socket.io";
import Message from "@models/Message";
import socketTryCatch from "@middlewares/socketTryCatch";
import User from "@models/User";

export default (io: Server) => {
    io.on("connection", (socket) => {
        socket.on(
            "message",
            socketTryCatch(socket, async (text: string) => {
                if (typeof text !== "string") {
                    throw "text must be a string";
                }

                const data = {
                    text,
                    timestamp: new Date().toISOString(),
                };

                await Message.create(data);

                socket.broadcast.emit("message", data);
            })
        );
    });
};
