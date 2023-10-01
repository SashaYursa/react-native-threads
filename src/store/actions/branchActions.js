import axios from "axios";
import { ADD_COMMENT, LOAD_BRANCH_COMMENTS, SET_REPLIES, SET_THREAD, REMOVE_PREVIEW_IMAGES } from "../types";
import { DEFAULT_API_URL, USER_IMAGE_URL } from "../../constants";

export const loadBranch = (thread) => {
    return async dispatch => {
        dispatch({type: SET_THREAD, payload: thread});
        await axios.get(DEFAULT_API_URL + `comments/thread/${thread.id}`)
        .then(comments =>{
            dispatch({type: LOAD_BRANCH_COMMENTS, payload: comments.data})
        })
        .catch(exeption => {
            console.log('exeption in branchActions->loadBranch', exeption)
        })
    }
}

export const addThreadComment = (comment, authorId, threadId) => {
    return async dispatch => {
        await axios.post(DEFAULT_API_URL + `comments/threads/${threadId}`, {comment, authorId, threadId})
        .then(data=> {
            console.log('data',data.data);
            dispatch({type: ADD_COMMENT, payload: data.data});
        })
    }
}

export const loadCommentReplies = (commentId) => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + `comments/replies/${commentId}`)
        .then(data => {
            //console.log(data.data, 'loadCommentReplies-> data');
            dispatch({type: SET_REPLIES, payload: {replies: data.data, commentId}});
           // dispatch({type: REMOVE_PREVIEW_IMAGES, payload: commentId});
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const handleSubscribe = (userId, subscribeTo) => {

    return async dispatch => {
        dispatch({type: HANDLE_SUBSCRIBE_PROGRESS, payload: true});
        await axios.post(DEFAULT_API_URL + `users?userId=${userId}`, {subscribeTo})
        .then(data => {
            console.log(data.data);
            if(data){
            dispatch({type: HANDLE_SUBSCRIBE, payload: subscribeTo});
            }
            dispatch({type: HANDLE_SUBSCRIBE_PROGRESS, payload: false});
        })
        .catch(exeption => {
            console.log('exeption in userActions->handleSubscribe', exeption)
        })
    }
}
