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
  return HTTP.put(`/posts/${id}`, post);
};

export const deletePost = id => {
  console.log(`DELETE ${id}`);
  return HTTP.delete(`/posts/${id}`);
};

export const votePost = (id, option) => {
  console.log(`${id} >> ${option}`);
  return HTTP.post(`/posts/${id}`, { option });
};
