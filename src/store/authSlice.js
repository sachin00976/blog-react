import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: {},
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { userData } = action.payload;
            // Check if this is defined
            state.status = true;
            state.userData = userData;
            
        },
        logout: (state) => {
            state.status = false;
            state.userData = {}; // Reset to an empty object to maintain consistency with initialState
            console.log("User logged out, data cleared."); // Print a message on logout
        }
    }
});

export const { login, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
