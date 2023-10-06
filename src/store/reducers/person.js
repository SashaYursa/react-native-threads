import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { personInfo } from "./person/personInfo";
import { personThreads } from "./person/personThreads";

export const personReducer = combineReducers({
    personInfo: personInfo,
    personThreads: personThreads
})
