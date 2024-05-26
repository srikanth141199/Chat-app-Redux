import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducers/authReducer";
import { chatReducer } from "./Reducers/chatReducer";


export const store = configureStore({
    reducer : {
        authReducer,
        chatReducer
    }
})