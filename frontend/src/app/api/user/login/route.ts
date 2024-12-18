import { NextRequest, NextResponse } from "next/server"
import { LoginTypes } from "../../../../types"
import axios from "axios"

export const POST = async (req: NextRequest) => {
    try {

        const body = await req.json() as LoginTypes

        if (body.email.length < 0 || body.Password.length < 0) {
            return NextResponse.json({
                message: "email is required",
                sucess: false
            }, {
                status: 1
            })
        }

        const response = await axios.post(`https://interactive-data-visualization-backend.onrender.com/user/login`, {
            email: body.email,
            Password: body.Password
        }, {
            withCredentials: true
        })

        const token = response?.data?.data?.token

        const res = NextResponse.json({
            message: "Successfully logged in",
            token: token
        }, {
            status: 200
        });


        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
        });

        return res;


    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
            console.log(error, "from getting errors from creating user", error?.response?.data?.message)

            return NextResponse.json({
                message: error?.response?.data?.message || "internal server errors"
            }, {
                status: 500
            })
        }

        console.error("Unexpected error:", error);
        return NextResponse.json(
            {
                message: "An unexpected error occurred",
            },
            {
                status: 500,
            }
        );
    }
}