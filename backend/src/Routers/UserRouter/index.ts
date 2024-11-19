import { Router } from "express"
import Controllers from "../../Controllers"


const { CreateUser } = Controllers.UserControllers

const userrouter = Router()

userrouter.post("/create", CreateUser)


export default userrouter