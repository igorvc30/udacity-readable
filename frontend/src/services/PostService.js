import { HTTP } from './config';

export const getPosts = () => {
  return HTTP.get(`/posts`);
};

export const getPostsCategory = category => {
  return HTTP.get(`/${category}/posts`);
};

export const createPost = post => {
  return HTTP.post(`/posts`, post);
};

export const editPost = (post, postId) => {
  return HTTP.put(`/posts/${postId}`, post);
};

export const deletePost = postId => {
  console.log(`DELETE ${postId}`);
  return HTTP.delete(`/posts/${postId}`);
};

export const votePost = (postId, option) => {
  return HTTP.post(`/posts/${postId}`, { option });
};
