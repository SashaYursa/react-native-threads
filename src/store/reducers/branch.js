import { LOAD_BRANCH_COMMENTS, SET_LOADING, SET_THREAD, ADD_COMMENT, SET_REPLIES, REMOVE_PREVIEW_IMAGES, ADD_REPLY, REMOVE_COMMENT_LIKE, SET_COMMENT_LIKE } from '../types'

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
    // const modifiedComment = state.comments.filter(comment => comment.id = action.payload);
    // console.log('modifiedComment->>>',modifiedComment )
    return {
      ...state
    }
    case REMOVE_COMMENT_LIKE:
      const withRemovedLike = JSON.parse(JSON.stringify(state.comments))
      withRemovedLike.map(comments => {
        comments.map(comment => {
          if(comment.id === action.payload.commentId){
            console.log(comment)
            comment.likes_count -= 1;
            comment.likes = comment.likes.filter(like => parseInt(like.id) !== parseInt(action.payload.likeId));
          }
          return comment
        })
        return comments;
      });
      //console.log(withRemovedLike, 'with-remove')
      return {
        ...state,
        comments: [
          ...withRemovedLike
        ]
      }
    case SET_COMMENT_LIKE: 
    const withAddedLike = JSON.parse(JSON.stringify(state.comments))
      withAddedLike.map(comments => {
        comments.map(comment => {
          if(comment.id === action.payload.commentId){
            console.log(comment)
            comment.likes_count += 1;
            comment.likes.push({comment_id: comment.id, id: action.payload.likeId, user_id: action.payload.userId})
          }
          return comment;
        })
        return comments;
      });
      return {
        ...state,
        comments: [
          ...withAddedLike
        ]
      }
    default: return state;
  }
}