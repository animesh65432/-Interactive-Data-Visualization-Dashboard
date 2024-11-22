import { createSlice } from "@reduxjs/toolkit"
import { DataTypes } from "../../types"

interface DataintialState {
    data: DataTypes[]
}

const DataSlice = createSlice({
    name: "data",
    initialState: {
        data: []
    } as DataintialState,
    reducers: {
        addthedata: (state, action) => {
            console.log(action.payload, "it's payload data")
            state.data = action.payload
        },
        removedata: (state, action) => {
            state.data = []
        }
    }
})

export const { addthedata, removedata } = DataSlice.actions

export default DataSlice.reducer