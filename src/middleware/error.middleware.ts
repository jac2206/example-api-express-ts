import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    const status = err.status || 500;

    res.status(status).json({
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: err.message || "Internal server error",
    });
};