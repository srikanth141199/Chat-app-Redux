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
            const { userDetails, selectedUser } = action.payload;
            state.user = selectedUser
            state.chatId = userDetails.uid > selectedUser.uid  ? userDetails.uid + selectedUser.uid : selectedUser.uid + userDetails.uid;
        }
    }
})

export const chatReducer = chatSlice.reducer;
export const {iniState, changeUser} = chatSlice.actions;
export const chatSelector = (state) => state.chatReducer;