import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addthedata } from "../store/slices/DataSlices"
import { RootState } from "../store"
import { DataTypes } from "../types"

const useDatahook = () => {
    const [data, setData] = useState<DataTypes[]>([]);
    const token = useSelector((state: RootState) => state.authslice.usertoken)
    const dispatch = useDispatch()
    const fetchData = async ({ startDate, endDate, gender, ageRange }: { startDate: string, endDate: string, gender?: string, ageRange?: string }) => {
        try {

            let response
            if (gender && ageRange) {
                response = await axios.get(`api/data?startDate=${startDate}&endDate=${endDate}&gender=${gender}&ageRange=${ageRange}`, {
                    headers: {
                        token
                    }
                })
            }
            else if (gender) {
                response = await axios.get(`api/data?startDate=${startDate}&endDate=${endDate}&gender=${gender}`, {
                    headers: {
                        token
                    }
                })
            }
            else if (ageRange) {
                response = await axios.get(`api/data?startDate=${startDate}&endDate=${endDate}&ageRange=${ageRange}`, {
                    headers: {
                        token
                    }
                })
            }
            else {
                response = await axios.get(`api/data?startDate=${startDate}&endDate=${endDate}`, {
                    headers: {
                        token
                    }
                })
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
