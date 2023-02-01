import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {},
    message:""
}

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        setUserProfile(state, action) {
            return { ...state, profile: action.payload, message: "user profile is set" };
        },
        reset:()=>initialState
    }
})


export const UserProfileActions = userProfileSlice.actions

export default userProfileSlice
