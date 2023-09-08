import { Socket } from "socket.io";

export default function errorHandler(socket: Socket, fn: Function) {
    return (...args: any[]) => {
        Promise.resolve(fn(...args)).catch((error) => socket.emit("error", { error }));
    };
}
