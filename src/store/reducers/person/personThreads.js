import { SET_PERSON_THREADS } from "../../types"

const initialState = {
    threads: {},
    loading: false,
    errors: {}
  }
  
export const personThreads = (state = initialState, action) => {
    switch (action.type){
      case SET_PERSON_THREADS: 
      return {
          ...state,
          loading: action.false,
          threads: action.payload
      }
      default: return state;
    }
}