import { RECEIVE_POSTS, ADD_POST } from '../actions/posts';

const posts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts
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
        state: [...state, action.post]
      };
    default:
      return state;
  }
};

export default posts;
