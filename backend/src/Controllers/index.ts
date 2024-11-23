import { CreateUser, logintheuser } from "./User"
import { RetrieveFilteredData } from "./Datavislation"

const Controllers = {
    UserControllers: { CreateUser, logintheuser },
    datavislation: { RetrieveFilteredData }
}

export default Controllers