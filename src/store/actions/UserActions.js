import axios from "axios";
import { SET_USER, REMOVE_USER, SET_LOADING, SET_ERROR, SET_IS_LOGIN_EMPTY, UPDATE_EDITED_USER, SET_EDIT_USER, SET_USER_IS_UPDATED} from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import { registerIndieID } from 'native-notify';
import instance from "../API/api";
export const loadUser = (id) => {
    return async dispatch => {
        await instance.get(`users/${id}`)
        .then(user => {
            user.data.image = USER_IMAGE_URL + user.data.image;
            dispatch({type: SET_USER, payload: user.data})
        })
        .catch(error=> {
            console.log('exeption in UserActions->loaduser', error)
        })
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
        await instance.patch(`users`, credentials)
        .then(async data => {
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
    return async dispatch => {
        dispatch({type: SET_LOADING, payload: true});
        await instance.post(`users`, credentials)
        .then(async data => {
            const user = data.data;
            if(user === ''){
                dispatch({type: SET_ERROR, payload: "Помилка"})
            }
            else if(user?.error){
                dispatch({type: SET_ERROR, payload: translateErorrs(user?.message)})
            }
            else{
                await registerIndieID(String(user.id), 13309, '9Sr3Pqbh3qfiyZsUNbVSTt');
                setUserIdToStorage(user.id);
                dispatch({type: SET_USER, payload: user})
                
            }
        })
    }
}
export const checkUserName = (name) => {
    return async dispatch => {
        await instance.get(`users/check/${name}`)
        .then(data => {
            const result = data.data;
            dispatch({type: SET_IS_LOGIN_EMPTY, payload: result});
        })
    }
}
export const editUserData = (field, data) => {
    return async dispatch => {
        dispatch({type: UPDATE_EDITED_USER, payload: {field, data}});
    }
}

export const compareUsers = (user, editUser) => {
    return async dispatch => {
    user = JSON.stringify(user);
    editUser = JSON.stringify(editUser);
    const isEdit = user !== editUser;
    dispatch({type: SET_EDIT_USER, payload: isEdit});    
}
}
export const updateUser = (user) => {
    return async dispatch => {
        if(user){
            return instance.put(`users/${user.id}`, {...user})
        .then(data => {
            dispatch({type: SET_USER_IS_UPDATED, payload: {field: 'data', value: true}})
        })
        .catch(err => {
            console.log(err)
        });
        }
        else{
            dispatch({type: SET_USER_IS_UPDATED, payload: {field: 'data', value: true}})
        }
        
    }
}
export const updateUserImage = (id, uri) => {
    return async dispatch => {
        if(id){
            await FileSystem.uploadAsync(DEFAULT_API_URL + `users/${id}`, uri, {
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: 'file'
            })
            .then(data => {
                dispatch({type: SET_USER_IS_UPDATED, payload: {field: 'image', value: true}})
            });
        }
        else{
            dispatch({type: SET_USER_IS_UPDATED, payload: {field: 'image', value: true}})
        }
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