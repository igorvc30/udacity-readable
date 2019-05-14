import { HTTP } from './config';

export const getComments = postId => {
  return HTTP.get(`/posts/${postId}/comments`);
};

export const createComment = comment => {
  return HTTP.post(`/comments`, comment);
};

export const editComment = (comment, commentId) => {
  return HTTP.put(`/comments/${commentId}`, comment);
};

export const deleteComment = commentId => {
  return HTTP.delete(`/comments/${commentId}`);
};

export const voteComment = (commentId, option) => {
  return HTTP.post(`/comments/${commentId}`, { option });
};
