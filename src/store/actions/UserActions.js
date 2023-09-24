import axios from "axios";
import { SET_USER, REMOVE_USER, SET_LOADING, SET_ERROR} from "../types";
import { DEFAULT_API_URL } from "../../constants";

export const loadUser = (id) => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + `users/${id}`)
        .then(user => dispatch({type: SET_USER, payload: user.data}))
    }
}
export const removeUser = () => {
    return async dispatch => {
        dispatch({type: REMOVE_USER})
    }
}
export const loginUser = (credentials) => {
    return async dispatch => {
        console.log(123)
        dispatch({type: SET_LOADING, payload: true});
        await axios.patch(DEFAULT_API_URL + `users`, credentials)
        .then(data => {
            const user = data.data;
            console.log(user)
            user?.error 
            ? (dispatch({type: SET_ERROR, payload: user.error}))
            : (dispatch({type: SET_USER, payload: user}))
        });
        }
}