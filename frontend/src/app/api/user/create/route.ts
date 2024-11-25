import { NextRequest, NextResponse } from "next/server"
import { usercreate } from "../../../../types"
import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json() as usercreate

        console.log("request body", body)

        if (body.email === null || body.Name === null || body.Password === null) {
            return NextResponse.json({
                message: "email is required",
                sucess: false
            }, {
                status: 1
            })
        }

        const response = await axios.post(`${process.env.BACKEND_URL}/user/create`, {
            email: body.email,
            Name: body.Name,
            Password: body.Password
        }, {
            withCredentials: true
        })

        console.log(response)

        return NextResponse.json({
            message: "sucessfully create it",
            token: response?.data?.data?.token
        }, {
            status: StatusCodes.CREATED
        })


    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
            console.log(error, "from getting errors from creating user")
            console.log(error, "from getting errors from creating user", error?.response?.data?.message)
            return NextResponse.json({
                message: error?.response?.data?.message || "internal server errors"
            }, {
                status: StatusCodes.INTERNAL_SERVER_ERROR
            })
        }
        console.error("Unexpected error:", error);
        return NextResponse.json(
            {
                message: "An unexpected error occurred",
            },
            {
                status: StatusCodes.INTERNAL_SERVER_ERROR,
            }
        );
    }
}