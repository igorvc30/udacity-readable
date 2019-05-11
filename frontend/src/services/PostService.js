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

export const editPost = (post, id) => {
  console.log(JSON.stringify(post));
  return HTTP.put(`/posts/${id}`, post);
};
