import { createSlice } from "@reduxjs/toolkit";

const Loginslice = createSlice({
    name: "Login",
    initialState: { Login: false, token: "", Loginuser: {} },

    reducers: {
        getToken(state) {
            state.token = localStorage.getItem('token')
        },
        Login(state, action) {
            state.Login = true;
            state.Loginuser = action.payload;
        }
    }
})
/* this function will return object(reducer && actions) */
export const LoginAction = Loginslice.actions;
export default Loginslice;