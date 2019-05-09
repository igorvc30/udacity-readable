import { HTTP } from './config';

export const getPosts = () => {
  return HTTP.get(`/posts`);
};

export const createPost = post => {
  return HTTP.post(`/posts`, post);
};
