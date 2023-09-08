import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export default function errorHandler(error: Error, _req: Request, res: Response, _: NextFunction) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        errors: [
            {
                msg: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
            },
        ],
    });
}
