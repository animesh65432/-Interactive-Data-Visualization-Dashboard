import express, { Request, Response } from "express"

const app = express()


app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        name: "hello name"
    })
})

app.listen(3000, () => {
    console.log(`server start at the port ${3000}`)
})