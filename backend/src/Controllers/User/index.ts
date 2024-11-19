import { RequestHandler } from "express";
import { CreateUserTypes } from "../../types";
import { ErrorResponse, SucessResponse, createtoken } from "../../Utils";
import db from "../../Db";

const CreateUser: RequestHandler = async (req, res) => {
    try {
        const { email } = req.body as CreateUserTypes;

        const user = await db.user.findUnique({
            where: { email },
        });

        let token;

        if (user) {
            token = createtoken({ email: user.email });
        } else {
            const newUser = await db.user.create({
                data: { email },
            });
            token = createtoken({ email: newUser.email });
        }

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        SucessResponse(res, "User Created Successfully", { token }, 201);
    } catch (error) {
        console.error(error);
        ErrorResponse(res, "Something went wrong", 500);
    }
};

export { CreateUser };
