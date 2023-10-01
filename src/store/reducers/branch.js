import { LOAD_BRANCH_COMMENTS, SET_LOADING, SET_THREAD, ADD_COMMENT } from '../types'

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
    case ADD_COMMENT: 
    return {
      ...state,
      thread: {
        ...state.thread,
        comments: {
          ...state.thread.comments,
          comments_count: state.thread.comments.comments_count + 1
        }
      },
      comments: [
        ...state.comments,
        action.payload
      ]
    }
    default: return state;
  }
}