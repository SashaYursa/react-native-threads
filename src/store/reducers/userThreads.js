import { LOAD_USER_THREADS, SET_LOADING_USER_THREADS} from '../types'

const initialState = {
  threads: [],
  loading: true
}

export const userThreadsReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_USER_THREADS:
    return{
      threads: action.payload,
      loading: false
    }
    case SET_LOADING_USER_THREADS:
      return {
        ...state,
        loading: action.payload
      }
    default: return state;
  }
}