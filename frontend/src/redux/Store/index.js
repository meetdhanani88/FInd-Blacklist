import { configureStore } from "@reduxjs/toolkit";
import Loginslice from "../reducersSlice/Loginslice";


const store = configureStore({
    reducer: {
        Login: Loginslice.reducer,


    }
})

export default store;