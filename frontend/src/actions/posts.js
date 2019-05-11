import { showLoading, hideLoading } from 'react-redux-loading';
import {
  getPosts,
  createPost,
  editPost as edit,
  getPostsCategory
} from './../services/PostService';

export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const POSTS_CATEGORY = 'POSTS_CATEGORY';

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

function editPost(post) {
  return {
    type: EDIT_POST,
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

export function handleEditPost(post) {
  return dispatch => {
    dispatch(showLoading());
    console.log(JSON.stringify(post));
    const { title, body } = post;
    return edit({ title, body }, post.id)
      .then(res => {
        const post = res.data;
        dispatch(editPost(post));
      })
      .finally(() => dispatch(hideLoading()));
  };
}

export function handleInitialPosts() {
  return dispatch => {
    dispatch(showLoading());
    return getPosts()
      .then(res => {
        const posts = res.data;
        dispatch(receivePosts(posts));
      })
      .finally(dispatch(hideLoading()));
  };
}

export function handlePostsCategory(category) {
  return dispatch => {
    dispatch(showLoading());
    return getPostsCategory(category)
      .then(res => {
        const posts = res.data;
        dispatch(receivePosts(posts));
      })
      .finally(dispatch(hideLoading()));
  };
}
