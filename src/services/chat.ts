import { Server } from "socket.io";
import Message from "@models/Message";
import errorHandler from "@middlewares/errorHandler";

export default (io: Server) => {
    io.on("connection", (socket) => {
        socket.on(
            "message",
            errorHandler(socket, async (text: string) => {
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