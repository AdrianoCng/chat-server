import { Server } from "socket.io";

const connectedUsers: { [key: string]: string } = {};

function isSocketAuthenticated(socketId: string) {
    // Check if the socket is associated with an authenticated user
    for (const userId in connectedUsers) {
        if (connectedUsers[userId] === socketId) {
            return true;
        }
    }
    return false;
}

export default (io: Server) => {
    io.on("connection", (socket) => {
        socket.on("authenticate", (userInfo) => {
            const userId: string | undefined = userInfo?.userId;

            if (!userId) {
                console.log("User not authenticated. Disconnecting...");
                return socket.disconnect(true);
            }

            connectedUsers[userId] = socket.id;

            console.log(`User ${userId} authenticated`);
        });

        if (!isSocketAuthenticated(socket.id)) {
            console.log("User not authenticated. Disconnecting...");
            return socket.disconnect(true);
        }
    });
};
