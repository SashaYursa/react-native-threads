import { LOAD_USERS } from '../types'

const initialState = {
  users: [],
  loading: true
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_USERS:
    return{
      users: action.payload,
      loading: false
    }
    default: return state;
  }
}