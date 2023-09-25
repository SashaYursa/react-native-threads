import axios from "axios";
import { SET_USER, REMOVE_USER, SET_LOADING, SET_ERROR, SET_IS_LOGIN_EMPTY} from "../types";
import { DEFAULT_API_URL } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
export const setError = (error) => {
    return async dispatch => {
        dispatch({type: SET_ERROR, payload: error})
    }
}
export const loginUser = (credentials) => {
    return async dispatch => {
        dispatch({type: SET_LOADING, payload: true});
        await axios.patch(DEFAULT_API_URL + `users`, credentials)
        .then(data => {
            const user = data.data;
            if(user === ''){
                dispatch({type: SET_ERROR, payload: "Помилка"})
            }
            else if(user?.error){
                dispatch({type: SET_ERROR, payload: translateErorrs(user?.message)})
            }
            else{
                setUserIdToStorage(user.id);
                dispatch({type: SET_USER, payload: user})
            }
        });
        }
}

export const registerUser = (credentials) => {
    console.log(credentials)
    return async dispatch => {
        dispatch({type: SET_LOADING, payload: true});
        await axios.post(DEFAULT_API_URL + `users`, credentials)
        .then(data => {
            const user = data.data;
            if(user === ''){
                dispatch({type: SET_ERROR, payload: "Помилка"})
            }
            else if(user?.error){
                dispatch({type: SET_ERROR, payload: translateErorrs(user?.message)})
            }
            else{
                setUserIdToStorage(user.id);
                dispatch({type: SET_USER, payload: user})
            }
        })
    }
}
export const checkUserName = (name) => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + `users/check/${name}`)
        .then(data => {
            const result = data.data;
            dispatch({type: SET_IS_LOGIN_EMPTY, payload: result});
        })
    }
}

const translateErorrs = (error) => {
   let translatedError = ''
    switch(error){
        case 'login failed':
            translatedError = 'Введено неправильно логін або пароль'
            break;
        case 'registration failed':
            translatedError = 'Помилка при реєстрації'
            break;
        default:
             translatedError = 'Помилка при вході'
    }
    return translatedError;
}

const setUserIdToStorage = async userId => {
    userId = JSON.stringify(userId);
    await AsyncStorage.setItem('userId', userId);
}