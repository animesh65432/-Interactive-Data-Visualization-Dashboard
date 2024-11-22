import { Router } from "express"
import Controllers from "../../Controllers"
import middleware from "../../middleware"

const { RetrieveFilteredData } = Controllers.datavislation

const dataRouter = Router()

dataRouter.get("/GetData", RetrieveFilteredData)
export default dataRouter