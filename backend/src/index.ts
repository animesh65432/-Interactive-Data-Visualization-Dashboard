import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import { userrouter, dataRouter } from "./Routers"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/user", userrouter)
app.use("/data", dataRouter)


app.listen(process.env.PORT || 4000, () => {
    console.log(`server start at the port ${process.env.PORT}`)
})