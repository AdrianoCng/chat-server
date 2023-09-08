import { Server } from "socket.io";

import chat from "./chat";
// import authentication from "./authentication";

export default function initializeSockets(io: Server) {
    chat(io);
    // authentication(io);
}
