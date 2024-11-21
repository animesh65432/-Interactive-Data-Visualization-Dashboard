import React from "react"
import Store from "@/store"
import { Provider } from "react-redux"

type Props = {
    children: React.ReactNode
}
const StoreProvider: React.FC<Props> = ({ children }) => {
    return <>
        <Provider store={Store}>
            {children}
        </Provider>
    </>
}

export default StoreProvider