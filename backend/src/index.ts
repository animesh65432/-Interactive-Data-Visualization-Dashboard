import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import { userrouter, dataRouter } from "./Routers"
import cors from "cors"
import serverless from "serverless-http"

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use("/user", userrouter)
app.use("/data", dataRouter)



export const handler = serverless(app)