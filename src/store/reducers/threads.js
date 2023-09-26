import { LOAD_THREADS, TOGGLE_BOOKMARKED, REMOVE_THREAD, ADD_POST } from '../types'

const initialState = {
  threads: [],
  loading: true
}

export const threadsReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_THREADS:
    return{
      threads: action.payload,
      loading: false
    }
    case REMOVE_THREAD: 
    return{
      threads: action.payload,
      loading: true
    }
    default: return state;
  }
}