import { SET_ADD_THREAD_IMAGE, SET_ADD_THREAD_TEXT, SET_ADD_THREAD_ERROR, DELETE_ADD_THREAD_IMAGE, DELETE_ADD_THREAD_ERROR } from '../types'

const initialState = {
  thread: {
    text: '',
    images: []
  },
  loading: false,
  errors: {}
}

export const addThreadReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_ADD_THREAD_TEXT: 
    return {
        ...state,
        thread: {
            ...state.thread,
            text: action.payload.text
        }
    }
    case SET_ADD_THREAD_IMAGE: 
    return {
        ...state,
        thread: {
            ...state.thread,
            images: [
                ...state.thread.images,
                ...action.payload.images
            ]
        }
    }
    case SET_ADD_THREAD_ERROR:
    return {
        ...state,
        errors: {
            ...state.errors,
            [action.payload.error.type]: action.payload.error.value
        }
    }
    case DELETE_ADD_THREAD_IMAGE:
        const filteredImages = [];
        state?.thread?.images.forEach(image => {
            if(image.uri !== action.payload.imageUri){
                filteredImages.push(image)
            }    
        }); 
    //const  = state.thread.images.filter(image=> image.uri !== action.payload.imageUri);
    return {
        ...state,
        thread: {
            ...state.thread,
            images: [
                ...filteredImages
            ]
        }
    }
    case DELETE_ADD_THREAD_ERROR:
     const filteredErrors = Object.fromEntries(Object.entries(state.errors).
    filter(([key, val]) => key !== action.payload.error));   
    return {
        ...state,
        errors: {
            ...filteredErrors
        }
    }
    default: return state;
  }
}