import { createSlice } from "@reduxjs/toolkit";

const Loginslice = createSlice({
    name: "Login",
    initialState: {
        Login: false,
        token: "",
        Loginuser: {}, userlist: [],
        userEditId: "",
        blacklistedvendorlist: [], role: "", blacklistedvendorlistId: ""
    },

    reducers: {

        Login(state, action) {
            state.Login = true;
            state.Loginuser = action.payload;
        },
        userList(state, action) {

            state.userlist = action.payload;
            // console.log(state.userlist)

        },
        GetuserEditId(state, action) {
            state.userEditId = action.payload;
        },
        setblacklistedvendorlist(state, action) {
            state.blacklistedvendorlist = action.payload
        },
        setblacklistedvendorEditId(state, action) {
            state.blacklistedvendorlistId = action.payload;
        }

    }
})
/* this function will return object(reducer && actions) */
export const LoginAction = Loginslice.actions;
export default Loginslice;