import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import userReducer from "./user/userReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }
});

export default store;