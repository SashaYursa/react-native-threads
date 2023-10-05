import axios from "axios";
import {LOAD_USER_THREADS } from "../types";
import { DEFAULT_API_URL } from "../../constants";

export const loadUserThreads = (userId) => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + `threads/user/${userId}`)
        .then(threads=> {
            dispatch({type: LOAD_USER_THREADS, payload: threads.data})
        })
    }
}