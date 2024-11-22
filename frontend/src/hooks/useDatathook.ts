import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { addthedata } from "../store/slices/DataSlices"

const useDatahook = () => {
    const [data, setData] = useState<any[]>([]);
    const dispatch = useDispatch()
    const fetchData = async () => {
        try {
            let response = await axios.get("/api/data?startDate=4/10/2022&endDate=5/10/2022");
            setData(response?.data?.data)
            dispatch(addthedata(response?.data?.data))
        } catch (error) {
            console.error(error);
            setData([])
        }
        finally {
            return data
        }
    };

    return { data, fetchData };
};

export default useDatahook;
