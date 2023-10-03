import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { threadsReducer } from "./reducers/threads";
import { userReducer } from "./reducers/user";
import { usersReducer } from "./reducers/users";
import { branchReducer } from "./reducers/branch";
import { userThreadsReducer } from "./reducers/userThreads";
import { addThreadReducer } from "./reducers/addThread";

const rootReducer = combineReducers({
    threads: threadsReducer,
    user: userReducer,
    userThreads: userThreadsReducer,
    users: usersReducer,
    branch: branchReducer,
    addThread: addThreadReducer,
})

export default configureStore({reducer: rootReducer});