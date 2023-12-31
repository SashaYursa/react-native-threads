import { SET_USER, REMOVE_USER, LOGIN_USER, SET_LOADING, SET_ERROR, SET_IS_LOGIN_EMPTY, UPDATE_EDITED_USER, SET_EDIT_USER, SET_USER_IS_UPDATED } from '../types'

const initialState = {
  user: {},
  loading: false,
  isLogined: false,
  error: false,
  isEmptyLogin: true,
  userIsEdited: false,
  editedUser: {},
  uploadedItems: {data: false, image: false},
}

export const userReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_USER:
    return{
      ...state,
      user: action.payload,
      loading: false,
      isLogined: true,
      error: false,
      editedUser: action.payload
    }
    case REMOVE_USER: 
    return{
      ...initialState
    }
    case LOGIN_USER: 
    return {
      ...state,
      user: action.payload,
      loading: false,
      isLogined: true,
      error: false,
      editedUser: action.payload
    }
    case SET_LOADING: 
    return {
      ...state,
      loading: action.payload
    }
    case SET_ERROR:
    return {
      ...state,
      error : action.payload,
      loading: false
    }
    case SET_IS_LOGIN_EMPTY:
      return {
        ...state, 
        isEmptyLogin: action.payload
    }
    case UPDATE_EDITED_USER: 
      return {
        ...state,
        userIsEdited: true,
        editedUser: {
          ...state.editedUser,
          [action.payload.field]:  action.payload.data
        }
      }
    case SET_EDIT_USER: 
    return {
      ...state, 
      userIsEdited: action.payload
    }
    case SET_USER_IS_UPDATED:
      return {
        ...state, 
        uploadedItems: {
          ...state.uploadedItems,
          [action.payload.field]: action.payload.value
        },
      }
    default: return state;
  }
}