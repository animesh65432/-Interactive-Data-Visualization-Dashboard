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
            state.data = action.payload
        },
        removedata: (state) => {
            state.data = []
        }
    }
})

export const { addthedata, removedata } = DataSlice.actions

export default DataSlice.reducer