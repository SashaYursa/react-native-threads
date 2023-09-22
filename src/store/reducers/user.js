import { LOAD_USER } from '../types'

const initialState = {
  user: [],
  loading: true
}

export const userReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_USER:
    return{
      user: action.payload,
      loading: false
    }
    default: return state;
  }
}