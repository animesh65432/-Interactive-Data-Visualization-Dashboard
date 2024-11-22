import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthsliceTypes {
    usertoken: string;
}

const isClient = typeof window !== "undefined";

const AuthSlices = createSlice({
    name: "Authslice",
    initialState: {
        usertoken: isClient ? localStorage.getItem("token") || "" : "",
    } as AuthsliceTypes,
    reducers: {
        addthetoken: (state, action: PayloadAction<string>) => {
            state.usertoken = action.payload;
            if (isClient) {
                localStorage.setItem("token", action.payload);
            }
        },
        removetoken: (state) => {
            state.usertoken = "";
            if (isClient) {
                localStorage.removeItem("token");
            }
        },
    },
});

export const { addthetoken, removetoken } = AuthSlices.actions;
export default AuthSlices.reducer;
