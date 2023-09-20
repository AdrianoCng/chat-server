import CustomError from "errors/CustomError";
import { StatusCodes } from "http-status-codes";
import { ExtendedError } from "socket.io/dist/namespace";

const authenticateSocket = (socket: any, next: (err?: ExtendedError) => void) => {
    if (socket.request.isAuthenticated()) {
        return next();
    } else {
        return next(new CustomError(StatusCodes.UNAUTHORIZED));
    }
};

export default authenticateSocket;
