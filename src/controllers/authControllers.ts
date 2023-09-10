import User from "@models/User";
import CustomError from "errors/CustomError";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username) {
        next(new CustomError(StatusCodes.BAD_REQUEST));
        return;
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
        next(new CustomError(StatusCodes.BAD_REQUEST, "User already exists"));
        return;
    }

    const user = await User.create({ username, password });

    res.status(StatusCodes.CREATED).json({ username, userId: user.id });
};

export default {
    register,
};
