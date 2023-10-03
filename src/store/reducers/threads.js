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
    let copyToSet = JSON.parse(JSON.stringify(state.threads))
    copyToSet = copyToSet.map(thread => {
     if(thread.id === action.payload.threadId){
      thread.likes_count = thread.likes_count + 1
      thread.likes.push(action.payload.data);
    }
     return thread
    })
    return {
      ...state,
      threads: [
        ...copyToSet
      ]
    }
    case REMOVE_LIKE: 
    let copyToRemove = JSON.parse(JSON.stringify(state.threads))
    copyToRemove = copyToRemove.map(thread => {
     if(thread.id === action.payload.threadId){
      thread.likes_count = thread.likes_count - 1
      thread.likes = thread.likes.filter(like => parseInt(like.id) !== parseInt(action.payload.likeId))
    }
     return thread
    })
    return {
      ...state,
      threads: [
        ...copyToRemove
      ]
    }
    default: return state;
  }
}