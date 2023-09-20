import { Socket } from "socket.io";

export default function socketErrorHandler(socket: Socket, fn: Function) {
    return (...args: any[]) => {
        Promise.resolve(fn(...args)).catch((error) => socket.emit("error", error));
    };
}
