import axios from "axios";
import { LOAD_USERS, HANDLE_SUBSCRIBE_PROGRESS, SET_USERS_SUBSCRIBE} from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";

export const loadUsers = (userId) => {
    console.log(userId, 'useriddidididididi')
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
        const res = await subscribe(userId, subscribeTo)
        console.log(res)
        if(res.status){
            dispatch({type: HANDLE_SUBSCRIBE_PROGRESS, payload: false});
            if(res.type === 'subscribe'){
                dispatch({type: SET_USERS_SUBSCRIBE, payload: {id: subscribeTo, subscribe: true}})
            }
            if(res.type === 'unsubscribe'){
                dispatch({type: SET_USERS_SUBSCRIBE, payload: {id: subscribeTo, subscribe: false}})
            }
        }
    }
}
export const subscribe = async (userId, subscribeTo) => {
    let result = await axios.post(DEFAULT_API_URL + `users?userId=${userId}`, {subscribeTo});
    return result.data;
}
