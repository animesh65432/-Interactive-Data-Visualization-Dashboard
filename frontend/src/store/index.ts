import { configureStore } from "@reduxjs/toolkit"
import AuthSlicesReducer from "./slices/AuthSlices"
import DataReducer from "./slices/DataSlices"

const Store = configureStore({
    reducer: {
        authslice: AuthSlicesReducer,
        datareducer: DataReducer
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export default Store