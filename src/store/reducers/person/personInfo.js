import { SET_PERSON_DATA } from "../../types"

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
          loading: action.false,
          data: action.payload
      }
      default: return state;
    }
}