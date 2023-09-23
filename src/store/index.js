import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { threadsReducer } from "./reducers/threads";
import { userReducer } from "./reducers/user";
import { usersReducer } from "./reducers/users";

const rootReducer = combineReducers({
    threads: threadsReducer,
    user: userReducer,
    users: usersReducer,
})

export default configureStore({reducer: rootReducer});