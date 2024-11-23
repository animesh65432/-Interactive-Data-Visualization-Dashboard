import { useState } from "react";
import axios from "axios";
import { usercreate } from "../types";

const useUserCreateHook = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [flg, setflg] = useState<boolean>(false)
    const createUser = async (data: usercreate) => {
        setLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.post("/api/user/create", data);
            console.log(response);
            setflg(false)
        } catch (error: any) {
            console.error(error);
            setflg(true)
            setErrorMessage(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }
    };

    return { loading, errorMessage, createUser, flg };
};

export default useUserCreateHook;
