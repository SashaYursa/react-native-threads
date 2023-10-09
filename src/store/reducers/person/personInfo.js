import { SET_PERSON_DATA, SET_PERSON_DATA_LOADING, SET_PERSON_SUBSCRIBE } from "../../types"

const initialState = {
    data: {},
    loading: false,
    errors: {}
  }
  
export const personInfo = (state = initialState, action) => {
    switch (action.type){
      case SET_PERSON_DATA: 
      return {
          ...state,
          data: action.payload,
      }
      case SET_PERSON_DATA_LOADING: 
      return {
        ...state,
        loading: action.payload
      }
      case SET_PERSON_SUBSCRIBE:
        return {
          ...state,
          data: {
            ...state.data,
            isSubscribed: action.payload,
            subs: state.data.subs + (action.payload ? 1 : -1)
          }
        }
      default: return state;
    }
}