import { SET_LIKE, REMOVE_LIKE, LOAD_THREADS, TOGGLE_BOOKMARKED, REMOVE_THREAD, ADD_POST, SET_THREADS_LOADING } from '../types'

const initialState = {
  threads: [],
  loading: true
}

export const threadsReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_THREADS:
    return {
      threads: action.payload,
      loading: false
    }
    case SET_THREADS_LOADING:
    return {
      ...state,
      loading: action.payload
    }
    case REMOVE_THREAD: 
    return{
      threads: action.payload,
      loading: true
    }
    case SET_LIKE: 
    return {
      ...state,
      threads: [
        ...state.threads.map(thread => {
          if(thread.id === action.payload.threadId){
            return {
              ...thread,
              likes_count: thread.likes_count + 1, 
              likes: [
                ...thread.likes,
                action.payload.data
              ]
            }
          }
          return thread;
        })
      ]
    }
    case REMOVE_LIKE: 
    return {
      ...state,
      threads: [
        ...state.threads.map(thread => {
          if(thread.id === action.payload.threadId){
            return {
              ...thread,
              likes_count: thread.likes_count - 1, 
              likes: thread.likes.filter(like => parseInt(like.id) !== parseInt(action.payload.likeId))
            }
          }
          return thread;
        })
      ]
    }
    default: return state;
  }
}