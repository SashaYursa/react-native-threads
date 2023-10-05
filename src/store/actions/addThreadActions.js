import axios from "axios";
import { SET_ADD_THREAD_IMAGE, SET_ADD_THREAD_TEXT, SET_ADD_THREAD_ERROR, DELETE_ADD_THREAD_IMAGE, DELETE_ADD_THREAD_ERROR, SET_ERROR, CLEAR_ADD_THREAD_DATA, SET_ADD_THREAD_LOADING } from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";
import * as FileSystem from 'expo-file-system';
export const setThreadTextToStore = (text) => {
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
export const clearData = () => {
    return dispatch => {
        dispatch({type: CLEAR_ADD_THREAD_DATA});
    }
}
export const setAddThreadLoading = (loading) => {
    return dispatch => {
        dispatch({type: SET_ADD_THREAD_LOADING, payload: loading});
    }
}

export const addThread = ({authorId, data, images }) => {
    return async dispatch => {
        
        if(authorId && data){
            axios.post(DEFAULT_API_URL + `threads`, {authorId, data })
            .then(data => { 
            const threadId = data.data.threadId;
            if(threadId && !!images.length){
                //console.log('done')
                images.forEach(async image => {
                    await uploadThreadImage(threadId, image.uri)
                    .then(data=> {
                        console.log(data, '-> status')
                        if(!data){
                            dispatch(setThreadError({type: 'loadError', value: 'Помилка при завантаженні файлів'}))
                        }
                        else{
                            
                        }
                    });
                });    
            }
            dispatch(setAddThreadLoading(false));
        })
        .catch(err => {
            console.log(err)
        });
        }
        else{
            //dispatch({type: SET_USER_IS_UPDATED, payload: {field: 'data', value: true}})
        }
        
    }
}

const uploadThreadImage = async (id, uri) => {
    let res;
    await FileSystem.uploadAsync(DEFAULT_API_URL + `threads/images/${id}`, uri, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file'
    })
    .then(data=> {
      res = data.body;
    })
    .catch(error => {
        res = error
        console.log('error in addThreadActions->uploadThreadImage', error);
    })
    return res;
}

