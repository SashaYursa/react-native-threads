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
  // switch (action.type) {
  //   case LOAD_THREADS:
  //     return {
  //       ...state,
  //       posts: action.payload,
  //       bookmarkedPosts: action.payload.filter(post => post.bookmarked),
  //       loading: false
  //     }

  //   case TOGGLE_BOOKMARKED:
  //     const threads = state.threads.map(post => {
  //       if (post.id === action.payload) {
  //         post.bookmarked = !post.bookmarked
  //       }
  //       return post
  //     })

  //     return {
  //       ...state,
  //       threads: threads,
  //       bookmarkedPosts: threads.filter(post => post.bookmarked)
  //     }

  //   case REMOVE_POST:
  //     return {
  //       ...state,
  //       threads: state.threads.filter(post => post.id !== action.payload),
  //       bookmarkedPosts: state.bookmarkedPosts.filter(
  //         post => post.id !== action.payload
  //       )
  //     }

  //   case ADD_POST:
  //     return {
  //       ...state,
  //       posts: [{ ...action.payload }, ...state.threads]
  //     }

  //   default:
  //     return state
  // }
  return state
}