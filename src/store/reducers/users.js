import { LOAD_USERS, SET_USERS_SUBSCRIBE, HANDLE_SUBSCRIBE_PROGRESS} from '../types'

const initialState = {
  users: [],
  loading: true,
  subscribeInProgress: false,
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_USERS:
    return{
      users: action.payload,
      loading: false
    }
    case SET_USERS_SUBSCRIBE: 
    return {
      ...state,
      users: [
        ...state.users.map(user=> {
          if(user.id === action.payload.id){
            return {...user, isSubscribed: action.payload.subscribe}
          }
          return user
        })
      ]
    }
    case HANDLE_SUBSCRIBE_PROGRESS: 
    return{
      ...state, 
      subscribeInProgress: action.payload
    }
    default: return state;
  }
}