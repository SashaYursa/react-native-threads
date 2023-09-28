import { LOAD_USERS, HANDLE_SUBSCRIBE, HANDLE_SUBSCRIBE_PROGRESS} from '../types'

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
    case HANDLE_SUBSCRIBE:
      let users = JSON.parse(JSON.stringify(state.users));
      users = users.map(user=> {
        if(user.id === action.payload) {
          user.isSubscribed ? user.subscribers -= 1 : user.subscribers += 1;
          user.isSubscribed = !user.isSubscribed;
        }
        return user;
      })
    return {
      ...state,
      users: [
        ...users
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