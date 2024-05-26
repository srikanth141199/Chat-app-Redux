import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    chatId : null,
    user : {}
}

const chatSlice = createSlice({
    name : "chat",
    initialState : initialState,
    reducers : {
        iniState : (state, action) => {
            state.chatId = null
            state.user = {}
        },
        changeUser : (state, action) =>{
            state.user = action.payload
            state.chatId = state.userDetails.uid > action.payload.uid  ? state.userDetails.uid + action.payload.uid : action.payload.uid + state.userDetails.uid;
        }
    }
})

export const chatReducer = chatSlice.reducer;
export const {iniState, changeUser} = chatSlice.actions;
export const chatSelector = (state) => state.chatReducer;