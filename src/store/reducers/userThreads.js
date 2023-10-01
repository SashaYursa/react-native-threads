import { LOAD_USER_THREADS} from '../types'

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
    default: return state;
  }
}