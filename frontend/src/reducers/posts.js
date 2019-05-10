import { RECEIVE_POSTS, ADD_POST, EDIT_POST } from '../actions/posts';

const posts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      console.log(JSON.stringify(action.posts));
      //https://stackoverflow.com/questions/26264956/convert-object-array-to-hash-map-indexed-by-an-attribute-value-of-the-object
      const indexedPosts = action.posts.reduce((map, obj) => ((map[obj.id] = obj), map), {});
      return {
        ...state,
        ...indexedPosts
      };
    // case TOGGLE_TWEET:
    //   return {
    //     ...state,
    //     [action.id]: {
    //       ...state[action.id],
    //       likes:
    //         action.hasLiked === true
    //           ? state[action.id].likes.filter(uid => uid !== action.authedUser)
    //           : state[action.id].likes.concat([action.authedUser])
    //     }
    //   };
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
    default:
      return state;
  }
};

export default posts;
