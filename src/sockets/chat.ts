import { Server } from "socket.io";

export default (io: Server) => {
    io.on("connection", (socket) => {
        socket.on("message", (text) => {
            const data = {
                text,
                timestamp: new Date().toISOString(),
            };
            console.log("message: ", data);

            socket.broadcast.emit("message", data);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};
