import axios from "axios";
import { LOAD_THREADS, SET_LIKE, REMOVE_THREAD, SET_THREADS_LOADING, REMOVE_LIKE } from "../types";
import { DEFAULT_API_URL } from "../../constants";

export const loadThreads = () => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + `threads`)
        .then(threads=> {
            dispatch({type: LOAD_THREADS, payload: threads.data})
        })
        .catch(error => {
            console.log('exeption in threadsActions->loadThreads', error)
        })
    }
}
export const setLoading = (loading) => {
    return async dispatch => {
        dispatch({type: SET_THREADS_LOADING, payload: loading});
    }
}
export const setLike = (userId, threadId) => {
    return async dispatch => {
        await axios.put(DEFAULT_API_URL + 'threads/like', {userId, threadId})
        .then(data=> {
            const result = data.data
            
            if(result.status === 'removed'){
                dispatch({type: REMOVE_LIKE, payload: {likeId:result.data, threadId}})
            }
            else{
                dispatch({type: SET_LIKE, payload: {data: {id:result.data, thread_id: threadId, user_id: userId}, threadId}})
            }
        })
        .catch(error => {
            console.log('exeption in threadsActions->setLike' , error)
        })
    }
}

export const removeThreads = () => {
    return async dispatch => {
        dispatch({type: REMOVE_THREAD, payload: []});
    }
}