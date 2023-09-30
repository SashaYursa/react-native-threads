import { LOAD_BRANCH_COMMENTS, SET_LOADING, SET_THREAD } from '../types'

const initialState = {
  thread: {},
  comments: [],
  loading: true,
  error: []
}

export const branchReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_THREAD:
    return {
      ...state,
      thread: action.payload,
      loading: false
    }
    case LOAD_BRANCH_COMMENTS: 
    return {
      ...state,
      comments: action.payload
    }
    case SET_LOADING: 
    return {
      ...state,
      loading: action.payload
    }
    default: return state;
  }
}