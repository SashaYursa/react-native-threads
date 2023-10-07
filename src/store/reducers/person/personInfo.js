import { SET_PERSON_DATA, SET_PERSON_DATA_LOADING } from "../../types"

const initialState = {
    data: {},
    loading: false,
    errors: {}
  }
  
export const personInfo = (state = initialState, action) => {
    switch (action.type){
      case SET_PERSON_DATA: 
      console.log(action.payload, '-------payload')
      return {
          ...state,
          data: action.payload,
          loading: action.false,
      }
      case SET_PERSON_DATA_LOADING: 
      return {
        ...state,
        loading: action.payload
      }
      default: return state;
    }
}