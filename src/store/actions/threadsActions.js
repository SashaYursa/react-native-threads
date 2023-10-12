import axios from "axios";
import { LOAD_THREADS, SET_LIKE, REMOVE_THREAD, SET_THREADS_LOADING, REMOVE_LIKE } from "../types";
import { DEFAULT_API_URL } from "../../constants";
import instance from "../API/api";
export const loadThreads = () => {
    return async dispatch => {
        await instance.get(`threads`)
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
        const likes = await sendLike(userId, threadId)
        console.log(likes)
        if(likes.status === 'removed'){
            dispatch({type: REMOVE_LIKE, payload: {likeId:likes.data, threadId}})
        }
        else{
            dispatch({type: SET_LIKE, payload: {data: {id:likes.data, thread_id: threadId, user_id: userId}, threadId}})
        }
    }
}

export const removeThreads = () => {
    return async dispatch => {
        dispatch({type: REMOVE_THREAD, payload: []});
    }
}
export const sendLike = async (userId, threadId) => {
    return await instance.put('threads/like', {userId, threadId})
    .then(data => data.data)
    .catch(error => {
        console.log('exeption in threadsActions->sendLike' , error)
    })
}
