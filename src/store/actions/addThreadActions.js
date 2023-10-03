import axios from "axios";
import { SET_ADD_THREAD_IMAGE, SET_ADD_THREAD_TEXT, SET_ADD_THREAD_ERROR, DELETE_ADD_THREAD_IMAGE, DELETE_ADD_THREAD_ERROR } from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";

export const setThreadText = (text) => {
    return async dispatch => {
        dispatch({type: SET_ADD_THREAD_TEXT, payload: {text}});
    }
}
export const setThreadImages = (images) => {
    return async dispatch => {
        console.log(images);
        dispatch({type: SET_ADD_THREAD_IMAGE, payload: {images}});
    }
}
export const setThreadError = (error) => {
    return async dispatch => {
        dispatch({type: SET_ADD_THREAD_ERROR, payload: {error}});
    }
}
export const deleteThreadImage = (imageUri) => {
    return async dispatch => {
        dispatch({type: DELETE_ADD_THREAD_IMAGE, payload: {imageUri}});
    }
}
export const deleteThreadError = (error) => {
    return async dispatch => {
        dispatch({type: DELETE_ADD_THREAD_ERROR, payload: {error}});
    }
}

