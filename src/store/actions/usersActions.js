import axios from "axios";
import { LOAD_USERS, HANDLE_SUBSCRIBE_PROGRESS, SET_USERS_SUBSCRIBE} from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";
import instance from "../API/api";
export const loadUsers = (userId) => {
    return async dispatch => {
        await instance.get(`users`)
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

export const handleSubscribe = (subscribeTo) => {

    return async dispatch => {
        dispatch({type: HANDLE_SUBSCRIBE_PROGRESS, payload: true});
        const res = await subscribe(subscribeTo)
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
export const subscribe = async (subscribeTo) => {
    let result = await instance.post(`subscribe/${subscribeTo}`);
    return result.data;
}
