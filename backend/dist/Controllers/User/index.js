"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logintheuser = exports.CreateUser = void 0;
const Utils_1 = require("../../Utils");
const Db_1 = __importDefault(require("../../Db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const CreateUser = async (req, res) => {
    try {
        const { email, Name, Password } = req.body;
        if (!email || !Name || !Password) {
            (0, Utils_1.ErrorResponse)(res, "email and name and password is required", 400);
            return;
        }
        const user = await Db_1.default.user.findUnique({
            where: { email },
        });
        if (user) {
            (0, Utils_1.ErrorResponse)(res, "User is already signed up", 400);
            return;
        }
        const hashpassword = await bcrypt_1.default.hash(Password, 10);
        await Db_1.default.user.create({
            data: {
                email,
                Name,
                Password: hashpassword,
            },
        });
        (0, Utils_1.SucessResponse)(res, "User Created Successfully", null, 201);
        return;
    }
    catch (error) {
        console.error(error);
        (0, Utils_1.ErrorResponse)(res, "Something went wrong", 500);
        return;
    }
};
exports.CreateUser = CreateUser;
const logintheuser = async (req, res) => {
    try {
        const { email, Password } = req.body;
        if (!email || !Password) {
            (0, Utils_1.ErrorResponse)(res, "Email and password are required", 400);
            return;
        }
        const user = await Db_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            (0, Utils_1.ErrorResponse)(res, "User did not sign up", 400);
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(Password, user.Password);
        if (!isPasswordValid) {
            (0, Utils_1.ErrorResponse)(res, "Invalid credentials", 401);
            return;
        }
        const token = (0, Utils_1.createtoken)({ email });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        (0, Utils_1.SucessResponse)(res, "sucessfully log in", { token }, 200);
        return;
    }
    catch (error) {
        console.error("Error during login:", error);
        (0, Utils_1.ErrorResponse)(res, "Internal Server Error", 500);
        return;
    }
};
exports.logintheuser = logintheuser;
