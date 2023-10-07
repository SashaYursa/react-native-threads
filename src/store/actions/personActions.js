import axios from "axios";
import { SET_PERSON_DATA, SET_PERSON_DATA_LOADING, SET_PERSON_THREADS, SET_PERSON_THREADS_LOADING } from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";

export const loadPersonData = (userId, routeData) => {
    return async dispatch => {
        console.log(routeData, 'routeData');
        dispatch(setLoadingPersonData(true));
        dispatch({type: SET_PERSON_DATA, payload: routeData});
        await axios.get(DEFAULT_API_URL + `users/${routeData.id}?userId=${userId}`)
        .then(person => {
            person.data.image = USER_IMAGE_URL + person.data.image;
            dispatch({type: SET_PERSON_DATA, payload: person.data})
            dispatch(setLoadingPersonData(false));
        })
        .catch(error=> {
            console.log('exeption in personActions->loadPersonData', error)
        })
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
        await axios.get(DEFAULT_API_URL + `threads/user/${userId}`)
        .then(threads=> {
            dispatch({type: SET_PERSON_THREADS, payload: threads.data})
        })
    }
}
