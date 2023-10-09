import { SET_PERSON_LIKE, SET_PERSON_THREADS, SET_PERSON_THREADS_LOADING, UNSET_PERSON_LIKE } from "../../types"

const initialState = {
    threads: [],
    loading: false,
    errors: {}
  }
  
export const personThreads = (state = initialState, action) => {
    switch (action.type){
      case SET_PERSON_THREADS: 
      return {
          ...state,
          loading: false,
          threads: action.payload
      }
      case SET_PERSON_THREADS_LOADING:
        return {
          ...state, 
          loading: action.payload
        }
      case SET_PERSON_LIKE: 
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
        case UNSET_PERSON_LIKE:
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