import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { threadsReducer } from "./reducers/threads";
import { userReducer } from "./reducers/user";

const rootReducer = combineReducers({
    threads: threadsReducer,
    user: userReducer
})

export default configureStore({reducer: rootReducer});