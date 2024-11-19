import { Request, Response } from "express";
import { SucessResponseTypes, ErrorResponseTypes } from "../types";
import jsonwebtoken from "jsonwebtoken"

const SucessResponse = (
    res: Response,
    message: string,
    data: any = null,
    status: number = 200
): Response => {
    const response: SucessResponseTypes = {
        success: true,
        message,
        data,
    };

    return res.status(status).json(response);
};


const ErrorResponse = (res: Response, message: string, status: number = 500): Response => {
    const response: ErrorResponseTypes = {
        success: false,
        message,
        data: null,
    };

    return res.status(status).json(response);
}


const createtoken = (data: { email: string }): string => {
    const token = jsonwebtoken.sign(data, process.env.JWT_SECRET as string)
    return token
}


export {
    SucessResponse,
    ErrorResponse,
    createtoken
}