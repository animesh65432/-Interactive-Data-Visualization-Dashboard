import axios from "axios"
import { useState } from "react"
import { LoginTypes } from "../types"
import { useDispatch } from "react-redux"
import { addthetoken } from "../store/slices/AuthSlices"

const useLoginhook = () => {
    const [loading, setloading] = useState<boolean>(false)
    const [errormessage, setErrorMessage] = useState<string>("")
    const [flg, setflg] = useState<boolean>(false)
    const dispatch = useDispatch()

    const loginfunc = async (data: LoginTypes) => {
        setloading(true)
        try {
            const response = await axios.post("/api/user/login", data)
            setflg(false)
            dispatch(addthetoken(response?.data?.token))
        } catch (error: unknown) {
            setflg(true)
            console.log(error)
            if (axios.isAxiosError(error)) {
                setErrorMessage(error?.response?.data?.message)
            }
        }
        finally {
            setloading(false)
        }
    }

    return { loading, loginfunc, errormessage, flg }
}


export default useLoginhook 