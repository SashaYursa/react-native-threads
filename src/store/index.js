import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { threadsReducer } from "./reducers/threads";
import { userReducer } from "./reducers/user";
import { usersReducer } from "./reducers/users";
import { branchReducer } from "./reducers/branch";
import { userThreadsReducer } from "./reducers/userThreads";
import { addThreadReducer } from "./reducers/addThread";
import { personReducer } from "./reducers/person";

const rootReducer = combineReducers({
    threads: threadsReducer,
    user: userReducer,
    userThreads: userThreadsReducer,
    users: usersReducer,
    branch: branchReducer,
    addThread: addThreadReducer,
    person: personReducer
})

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    })
});