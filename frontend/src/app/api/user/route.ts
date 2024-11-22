import { NextRequest, NextResponse } from "next/server"
import { usercreate } from "../../../types"
import axios from "axios"
import { StatusCodes } from "http-status-codes"

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json() as usercreate

        if (body.email === null) {
            return NextResponse.json({
                message: "email is required",
                sucess: false
            }, {
                status: 1
            })
        }

        let response = await axios.post(`${process.env.BACKEND_URL}/user/create`, { email: body.email }, {
            withCredentials: true
        })

        return NextResponse.json({
            message: "sucessfully create it",
            token: response?.data?.data?.token
        }, {
            status: StatusCodes.CREATED
        })


    } catch (error) {

        console.log(error, "from getting errors from creating user")

        return NextResponse.json({
            message: "internal server errors"
        }, {
            status: StatusCodes.INTERNAL_SERVER_ERROR
        })
    }
}