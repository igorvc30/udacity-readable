import { RECEIVE_POSTS, ADD_POST, EDIT_POST, REMOVE_POST, SORT_POSTS } from '../actions/posts';

const posts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      //https://stackoverflow.com/questions/26264956/convert-object-array-to-hash-map-indexed-by-an-attribute-value-of-the-object
      const indexedPosts = action.posts.reduce((map, obj) => ((map[obj.id] = obj), map), {});
      return {
        ...indexedPosts
      };
    case ADD_POST:
      return {
        ...state,
        [action.post.id]: action.post
      };
    case EDIT_POST:
      return {
        ...state,
        [action.post.id]: action.post
      };
    case REMOVE_POST:
      if (action.post.deleted) {
        delete state[`${action.post.id}`];
      }
      return state;
    case SORT_POSTS:
      const sortByKey = key => (a, b) => a[key] < b[key];
      const postsArray = Object.entries(state).map(([key, value]) => value);
      const sorted = postsArray.sort(sortByKey(action.sortType));
      console.log(JSON.stringify(postsArray));
      return sorted;
    default:
      return state;
  }
};

export default posts;
