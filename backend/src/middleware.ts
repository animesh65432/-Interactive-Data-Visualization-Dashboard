import { Request, Response, NextFunction } from "express"
import { ErrorResponse } from "./Utils"
import jwt from "jsonwebtoken"
import { jwtPayloadTypes } from "./types"
import db from "./Db"

const middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.cookies, "cookies")
        const token = req.cookies.token;

        console.log(process.env.JWT_SECRET, "token")


        if (!token) {
            ErrorResponse(res, "Unauthorized", 401);
            return
        }

        console.log("Bye")

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwtPayloadTypes
        const { email } = decoded

        if (!email) {
            ErrorResponse(res, "Unauthorized", 401);
        }


        const exstingUser = await db.user.findUnique({
            where: {
                email
            }
        })

        if (!exstingUser) {
            ErrorResponse(res, "Unauthorized", 401);
        }

        next()

    } catch (error) {

        console.log(error)
        ErrorResponse(res, "Unauthorized", 401);
    }
}



export default middleware