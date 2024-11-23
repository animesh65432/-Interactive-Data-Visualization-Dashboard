import { RequestHandler } from "express";
import { CreateUserTypes, LoginTypes } from "../../types";
import { ErrorResponse, SucessResponse, createtoken } from "../../Utils";
import db from "../../Db";
import bycrpt from "bcrypt"

const CreateUser: RequestHandler = async (req, res) => {
    try {
        const { email, Name, Password } = req.body as CreateUserTypes;

        if (!email || !Name || !Password) {
            ErrorResponse(res, "email and name and password is required", 400);
            return
        }

        const user = await db.user.findUnique({
            where: { email },
        });

        if (user) {
            ErrorResponse(res, "User is already signed up", 400);
            return
        }

        const hashpassword = await bycrpt.hash(Password, 10);

        await db.user.create({
            data: {
                email,
                Name,
                Password: hashpassword,
            },
        });

        SucessResponse(res, "User Created Successfully", null, 201);
        return
    } catch (error) {
        console.error(error);
        ErrorResponse(res, "Something went wrong", 500);
        return
    }
};

const logintheuser: RequestHandler = async (req, res) => {
    try {
        const { email, Password } = req.body as LoginTypes;


        if (!email || !Password) {
            ErrorResponse(res, "Email and password are required", 400);
            return
        }


        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            ErrorResponse(res, "User did not sign up", 400);
            return
        }

        const isPasswordValid = await bycrpt.compare(Password, user.Password);
        if (!isPasswordValid) {
            ErrorResponse(res, "Invalid credentials", 401);
            return
        }


        const token = createtoken({ email })

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        SucessResponse(res, "sucessfully log in", { token }, 200)
        return
    } catch (error) {
        console.error("Error during login:", error);
        ErrorResponse(res, "Internal Server Error", 500);
        return
    }
};

export { CreateUser, logintheuser };
