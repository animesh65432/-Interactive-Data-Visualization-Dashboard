import { Router } from "express"
import Controllers from "../../Controllers"


const { CreateUser, logintheuser } = Controllers.UserControllers

const userrouter = Router()

userrouter.post("/create", CreateUser)
userrouter.post("/login", logintheuser)


export default userrouter