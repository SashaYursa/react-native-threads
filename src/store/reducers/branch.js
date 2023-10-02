import { LOAD_BRANCH_COMMENTS, SET_LOADING, SET_THREAD, ADD_COMMENT, SET_REPLIES, REMOVE_PREVIEW_IMAGES, ADD_REPLY } from '../types'

const initialState = {
  thread: {},
  comments: [],
  loading: true,
  error: []
}

export const branchReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_THREAD:
    return {
      ...state,
      thread: action.payload,
      loading: false
    }
    case LOAD_BRANCH_COMMENTS: 
    const comments = action.payload.map(comment => {
      return [
        comment
      ]
    })
    return {
      ...state,
      comments: comments
    }
    case SET_LOADING: 
    return {
      ...state,
      loading: action.payload
    }
    case ADD_COMMENT: 
    return {
      ...state,
      comments: [
        ...state.comments,
        [action.payload]
      ]
    }
    case SET_REPLIES:
      const oldComments = JSON.parse(JSON.stringify(state.comments))
      const newComments = oldComments.map(comment => {
        if(comment[0].id === action.payload.commentId){
          action.payload.replies.forEach(element => {
            comment.push(element)
          });
          return comment;
        }  
        return comment;
      });
    return {
        ...state,
        comments: [
          ...newComments
        ]
      }
    case REMOVE_PREVIEW_IMAGES: 
    const modifiedComment = state.comments.filter(comment => comment.id = action.payload);
    console.log('modifiedComment->>>',modifiedComment )
    return {
      ...state
    }
    default: return state;
  }
}