import { createSlice } from "@reduxjs/toolkit"

interface AuthsliceTypes {
    usertoken: string
}

const AuthSlices = createSlice({
    name: "Authslice",
    initialState: {
        usertoken: ""
    } as AuthsliceTypes,
    reducers: {}
})

export default AuthSlices.reducer