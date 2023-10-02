import axios from "axios";
import { LOAD_THREADS, REMOVE_THREAD, SET_THREADS_LOADING } from "../types";
import { DEFAULT_API_URL } from "../../constants";

export const loadThreads = () => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + 'threads')
        .then(threads=> dispatch({type: LOAD_THREADS, payload: threads.data}))
    }
}
export const setLoading = (loading) => {
    return async dispatch => {
        dispatch({type: SET_THREADS_LOADING, payload: loading});
    }
}

export const removeThreads = () => {
    return async dispatch => {
        dispatch({type: REMOVE_THREAD, payload: []});
    }
}