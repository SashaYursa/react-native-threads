import axios from "axios";
import { LOAD_USERS, HANDLE_SUBSCRIBE, HANDLE_SUBSCRIBE_PROGRESS} from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";

export const loadUsers = (userId) => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + `users?userId=${userId}`)
        .then(users=>{
            users = users.data
            users.map(user=> {
                if(user.image !== null){
                   return user.image = USER_IMAGE_URL +  user.image 
                }
            })
            
            dispatch({type: LOAD_USERS, payload: users})
        })
        .catch(exeption => {
            console.log('exeption in userActions->loadUsers', exeption)
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
