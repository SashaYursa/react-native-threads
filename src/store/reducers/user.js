import { SET_USER, REMOVE_USER, LOGIN_USER, SET_LOADING, SET_ERROR } from '../types'

const initialState = {
  user: [],
  loading: false,
  isLogined: false,
  error: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_USER:
    return{
      user: action.payload,
      loading: false,
      isLogined: true,
      error: false
    }
    case REMOVE_USER: 
    return{
      user: [],
      loading: false,
      isLogined: false,
      error: false
    }
    case LOGIN_USER: 
    return {
      user: action.payload,
      loading: false,
      isLogined: true,
      error: false
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
    default: return state;
  }
}