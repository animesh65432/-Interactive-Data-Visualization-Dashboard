import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { addthedata } from "../store/slices/DataSlices"

const useDatahook = () => {
    const [data, setData] = useState<any[]>([]);
    const dispatch = useDispatch()
    const fetchData = async ({ startDate, endDate, gender, ageRange }: { startDate: string, endDate: string, gender?: string, ageRange?: string }) => {
        try {

            let response
            if (gender && ageRange) {
                response = await axios.get(`api/data?startDate=${startDate}&endDate=${endDate}&gender=${gender}&ageRange=${ageRange}`)
            }
            else if (gender) {
                response = await axios.get(`api/data?startDate=${startDate}&endDate=${endDate}&gender=${gender}`)
            }
            else if (ageRange) {
                response = await axios.get(`api/data?startDate=${startDate}&endDate=${endDate}&ageRange=${ageRange}`)
            }
            else {
                response = await axios.get(`api/data?startDate=${startDate}&endDate=${endDate}`)
            }

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
