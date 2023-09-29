import axios from "axios";
import { LOAD_BRANCH } from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";

export const loadBranch = (threadId) => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + `threads/${threadId}`)
        .then(branch =>{
            console.log(branch.data);
            dispatch({type: LOAD_BRANCH, payload: branch.data})
        })
        .catch(exeption => {
            console.log('exeption in branchActions->loadBranch', exeption)
        })
    }
}

export const handleSubscribe = (userId, subscribeTo) => {

    return async dispatch => {
        dispatch({type: HANDLE_SUBSCRIBE_PROGRESS, payload: true});
        await axios.post(DEFAULT_API_URL + `users?userId=${userId}`, {subscribeTo})
        .then(data => {
            console.log(data.data);
            if(data){
            dispatch({type: HANDLE_SUBSCRIBE, payload: subscribeTo});
            }
            dispatch({type: HANDLE_SUBSCRIBE_PROGRESS, payload: false});
        })
        .catch(exeption => {
            console.log('exeption in userActions->handleSubscribe', exeption)
        })
    }
}
