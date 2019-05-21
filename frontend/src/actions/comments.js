import { v4 } from 'node-uuid';
import { showLoading, hideLoading } from 'react-redux-loading';
import {
  getComments,
  createComment,
  editComment as edit,
  voteComment as vote,
  deleteComment as remove
} from '../services/CommentsService';

export const ADD_COMMENT = 'ADD_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
}

function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  };
}

function removePost(comment) {
  return {
    type: REMOVE_COMMENT,
    comment
  };
}

export function handleAddComment(newComment) {
  const comment = newComment;
  return dispatch => {
    dispatch(showLoading());
    comment.id = v4();
    comment.timestamp = Date.now();
    return createComment(comment)
      .then(res => {
        const commentReceived = res.data;
        dispatch(addComment(commentReceived));
      })
      .finally(() => dispatch(hideLoading()));
  };
}

export function handleEditComment(comment) {
  return dispatch => {
    dispatch(showLoading());
    const { title, body } = comment;
    return edit({ title, body }, comment.id)
      .then(res => {
        const commentReceived = res.data;
        dispatch(editComment(commentReceived));
      })
      .finally(() => dispatch(hideLoading()));
  };
}

export function handleVoteComment(id, option) {
  return dispatch => {
    dispatch(showLoading());
    return vote(id, option)
      .then(res => {
        const commentReceived = res.data;
        dispatch(editComment(commentReceived));
      })
      .finally(() => dispatch(hideLoading()));
  };
}

export function handleRemoveComment(commentId) {
  return dispatch => {
    dispatch(showLoading());
    return remove(commentId)
      .then(res => {
        const commentReceived = res.data;
        dispatch(removePost(commentReceived));
      })
      .finally(() => dispatch(hideLoading()));
  };
}

export function handleGetAllComments(postId) {
  return dispatch => {
    dispatch(showLoading());
    return getComments(postId)
      .then(res => {
        const comments = res.data;
        dispatch(receiveComments(comments));
      })
      .finally(dispatch(hideLoading()));
  };
}
