"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createtoken = exports.ErrorResponse = exports.SucessResponse = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SucessResponse = (res, message, data = null, status = 200) => {
    const response = {
        success: true,
        message,
        data,
    };
    return res.status(status).json(response);
};
exports.SucessResponse = SucessResponse;
const ErrorResponse = (res, message, status = 500) => {
    const response = {
        success: false,
        message,
        data: null,
    };
    return res.status(status).json(response);
};
exports.ErrorResponse = ErrorResponse;
const createtoken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET);
    return token;
};
exports.createtoken = createtoken;
