import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import { userrouter, dataRouter } from "./Routers"
import cors from "cors"

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

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "just started"
    })
})


app.listen(process.env.PORT || 4000, () => {
    console.log(`server start at the port ${process.env.PORT}`)
})
