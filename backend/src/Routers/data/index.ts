import { Router } from "express"
import Controllers from "../../Controllers"

const { RetrieveDataByTimeRange } = Controllers.datavislation

const dataRouter = Router()

dataRouter.get("/GetData", RetrieveDataByTimeRange)

export default dataRouter