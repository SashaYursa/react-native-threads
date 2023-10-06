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
export const addSelfThreadLike = (userId, threadId) => {
    return async dispatch => {
        const likes = await sendLike(userId, threadId)
        console.log(likes, 'likes =>>>.')
        if(likes.status === 'removed'){
            dispatch({type: REMOVE_LIKE, payload: {likeId:likes.data, threadId}})
        }
        else{
            dispatch({type: SET_LIKE, payload: {data: {id:likes.data, thread_id: threadId, user_id: userId}, threadId}})
        }
    }
}