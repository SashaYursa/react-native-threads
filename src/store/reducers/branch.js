import { LOAD_BRANCH } from '../types'

const initialState = {
  thread: {},
  loading: true,
  error: []
}

export const branchReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_BRANCH:
    return{
      thread: action.payload,
      loading: false
    }
    default: return state;
  }
}