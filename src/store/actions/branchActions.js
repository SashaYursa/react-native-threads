import axios from "axios";
import { ADD_COMMENT, ADD_REPLY, REMOVE_COMMENT_LIKE, LOAD_BRANCH_COMMENTS, SET_REPLIES, SET_THREAD, REMOVE_PREVIEW_IMAGES, SET_COMMENT_LIKE } from "../types";
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

export const addCommentReply = (comment, authorId, threadId, repliedCommentId) => {
    
    return async dispatch => {
        console.log(comment, authorId, threadId, repliedCommentId)
        await axios.post(DEFAULT_API_URL + `comments/reply/${repliedCommentId}`, {comment, authorId, reply: repliedCommentId, threadId})
        .then(data=> {
            dispatch({type: SET_REPLIES, payload: {commentId: repliedCommentId, replies: [data.data]}});
        })
        .catch(error=> {
            console.log('--->>>>problem in branchActions->addCommentReply', error);
        })
    }
}

export const loadCommentReplies = (commentId) => {
    return async dispatch => {
        await axios.get(DEFAULT_API_URL + `comments/replies/${commentId}`)
        .then(data => {
            //console.log(data.data, 'loadCommentReplies-> data');
        dispatch({type: SET_REPLIES, payload: {replies: data.data, commentId}});
           //dispatch({type: REMOVE_PREVIEW_IMAGES, payload: commentId});
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const setCommentLike = (userId, commentId) => {
    return async dispatch => {
        await axios.put(DEFAULT_API_URL + 'comments/likes', {userId, commentId})
        .then(data=> {
            const result = data.data
            console.log(result,'res');
            if(result.status === 'removed'){
                dispatch({type: REMOVE_COMMENT_LIKE, payload: {commentId, likeId: result.data}})
            }
            else{
                dispatch({type: SET_COMMENT_LIKE, payload: {commentId, likeId: result.data, userId}})
            }
        })
        .catch(error => {
            console.log('exeption in branchActions->setCommentLike' , error)
        })
    }
}
