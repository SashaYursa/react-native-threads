import axios from "axios";
import { SET_PERSON_DATA, SET_PERSON_DATA_LOADING } from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";

export const loadPersonData = (id) => {
    return async dispatch => {
        dispatch(setLoadingPersonData(true));
        await axios.get(DEFAULT_API_URL + `users/${id}`)
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
