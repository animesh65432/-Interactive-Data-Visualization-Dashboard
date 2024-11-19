import { Router } from "express"
import Controllers from "../../Controllers"

const { RetrieveFilteredData } = Controllers.datavislation

const dataRouter = Router()

dataRouter.get("/GetData", RetrieveFilteredData)

export default dataRouter