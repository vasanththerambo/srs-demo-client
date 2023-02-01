import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        id: "",
        email:""
    },
    token: "",
    message:""
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            const { message ,data } = action.payload;
            const { user, token } = data;


            return { ...state, message, token, user};
            
            
        },
        reset:()=>initialState
    }
})

export const authActions = authSlice.actions;

export default authSlice;
