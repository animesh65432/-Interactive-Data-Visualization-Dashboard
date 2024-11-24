"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Db_1 = __importDefault(require("./Db"));
const middleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            (0, Utils_1.ErrorResponse)(res, "Unauthorized: Token missing or malformed", 401);
            return;
        }
        const token = authHeader.split(' ')[1];
        console.log("token", token);
        if (!token) {
            (0, Utils_1.ErrorResponse)(res, "Unauthorized: Token not provided", 401);
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;
        if (!email) {
            (0, Utils_1.ErrorResponse)(res, "Unauthorized: Invalid token payload", 401);
            return;
        }
        const existingUser = await Db_1.default.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            (0, Utils_1.ErrorResponse)(res, "Unauthorized: User does not exist", 401);
            return;
        }
        next();
    }
    catch (error) {
        console.error("Error in auth middleware:", error);
        (0, Utils_1.ErrorResponse)(res, "Unauthorized: Token verification failed", 401);
    }
};
exports.default = middleware;
