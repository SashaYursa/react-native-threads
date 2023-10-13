import axios from "axios";
import { SET_PERSON_DATA, SET_PERSON_DATA_LOADING, SET_PERSON_LIKE, SET_PERSON_SUBSCRIBE, SET_PERSON_THREADS, SET_PERSON_THREADS_LOADING, UNSET_PERSON_LIKE } from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";
import { subscribe } from "./usersActions";
import { sendLike } from "./threadsActions";
import instance from "../API/api";
export const loadPersonData = (userId, routeData) => {
    return async dispatch => {
        dispatch(setLoadingPersonData(true));
        dispatch({type: SET_PERSON_DATA, payload: routeData});
        await axios.get(DEFAULT_API_URL + `users/${routeData.id}?userId=${userId}`)
        .then(person => {
            dispatch({type: SET_PERSON_DATA, payload: person.data})    
        })
        .catch(error=> {
            console.log('exeption in personActions->loadPersonData', error)
        })
        dispatch(setLoadingPersonData(false));
    }
}
export const setLoadingPersonData = (loadingStatus) => {
    return dispatch => {
        dispatch({type: SET_PERSON_DATA_LOADING, payload: loadingStatus});
    }
}
export const loadPersonThreads = (userId) => {
    return async dispatch => {
        dispatch({type: SET_PERSON_THREADS_LOADING, payload: true});
        await instance.get(`threads/user/${userId}`)
        .then(threads=> {
            dispatch({type: SET_PERSON_THREADS, payload: threads.data})
        })
    }
}
export const personSubscribe = (subscribeTo) => {
    
    return async dispatch => {
        dispatch({type: SET_PERSON_DATA_LOADING, payload: true})
        let res = await subscribe(subscribeTo);
        if(res.status){
            dispatch({type: SET_PERSON_DATA_LOADING, payload: false});
            if(res.type === 'subscribe'){
                dispatch({type: SET_PERSON_SUBSCRIBE, payload:true})
            }
            if(res.type === 'unsubscribe'){
                dispatch({type: SET_PERSON_SUBSCRIBE, payload: false})
            }
        }
    }
}
export const setPersonThreadLike = (userId, threadId) => {
    return async dispatch => {
        const likes = await sendLike(userId, threadId)
        if(likes.status === 'removed'){
            dispatch({type: UNSET_PERSON_LIKE, payload: {likeId:likes.data, threadId}})
        }
        else{
            dispatch({type: SET_PERSON_LIKE, payload: {data: {id:likes.data, thread_id: threadId, user_id: userId}, threadId}})
        }
    }
}
