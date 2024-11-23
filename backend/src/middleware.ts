import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "./Utils";
import jwt from "jsonwebtoken";
import { jwtPayloadTypes } from "./types";
import db from "./Db";

const middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            ErrorResponse(res, "Unauthorized: Token missing or malformed", 401);
            return;
        }

        const token = authHeader.split(' ')[1];

        console.log("token", token)

        if (!token) {
            ErrorResponse(res, "Unauthorized: Token not provided", 401);
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwtPayloadTypes;

        const { email } = decoded;

        if (!email) {
            ErrorResponse(res, "Unauthorized: Invalid token payload", 401);
            return;
        }

        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            ErrorResponse(res, "Unauthorized: User does not exist", 401);
            return;
        }


        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        ErrorResponse(res, "Unauthorized: Token verification failed", 401);
    }
};

export default middleware;
