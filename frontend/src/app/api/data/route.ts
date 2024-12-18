import axios from "axios"
import { NextRequest, NextResponse } from "next/server"
import { StatusCodes } from "http-status-codes"
export const GET = async (request: NextRequest) => {
    try {
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate")
        const gender = searchParams.get("gender")
        const ageRange = searchParams.get("ageRange")
        const token = request.headers.get("token")
        console.log("token in the next api", token)

        if (!startDate || !endDate) {
            return NextResponse.json({
                message: "startdate and enddate is importent"
            }, {
                status: StatusCodes.BAD_REQUEST
            })
        }
        let response
        if (gender && ageRange) {
            response = await axios.get(`https://interactive-data-visualization-backend.onrender.com/data/GetData?startDate=${startDate}&endDate=${endDate}&gender=${gender}&ageRange=${ageRange}`, {

                headers: {
                    "Authorization": `Bearer ${token}`,
                },

            })
        }
        else if (gender) {
            response = await axios.get(`${process.env.BACKEND_URL}/data/GetData?startDate=${startDate}&endDate=${endDate}&gender=${gender}`, {

                headers: {
                    "Authorization": `Bearer ${token}`,
                },

            })
        }
        else if (ageRange) {
            response = await axios.get(`${process.env.BACKEND_URL}/data/GetData?startDate=${startDate}&endDate=${endDate}&ageRange=${ageRange}`, {

                headers: {
                    "Authorization": `Bearer ${token}`,
                },

            })
        }
        else {
            response = await axios.get(`${process.env.BACKEND_URL}/data/GetData?startDate=${startDate}&endDate=${endDate}`, {

                headers: {
                    "Authorization": `Bearer ${token}`,
                },

            })
        }

        console.log(response)
        return NextResponse.json({
            message: response?.data?.message,
            data: response?.data?.data
        }, {
            status: StatusCodes.OK
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "internal server errors"
        }, {
            status: StatusCodes.INTERNAL_SERVER_ERROR
        })
    }
}