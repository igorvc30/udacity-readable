import { createPost } from '../services/PostService';
import { showLoading, hideLoading } from 'react-redux-loading';
import { getPosts } from './../services/PostService';

export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function handleAddPost(post) {
  return dispatch => {
    dispatch(showLoading());
    const date = Date.now();
    post['id'] = date.toString();
    post['timestamp'] = date;
    return createPost(post)
      .then(res => {
        const post = res.data;
        dispatch(addPost(post));
      })
      .finally(() => dispatch(hideLoading()));
  };
}

export function handleinitialPosts() {
  return dispatch => {
    dispatch(showLoading());
    return getPosts()
      .then(res => {
        const posts = res.data;
        console.log(JSON.stringify(posts));
        dispatch(receivePosts(posts));
      })
      .finally(dispatch(hideLoading()));
  };
}
