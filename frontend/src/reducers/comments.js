import { RECEIVE_COMMENTS, ADD_COMMENT, EDIT_COMMENT, REMOVE_COMMENT } from '../actions/comments';

const comments = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      //https://stackoverflow.com/questions/26264956/convert-object-array-to-hash-map-indexed-by-an-attribute-value-of-the-object
      const indexedPosts = action.comments.reduce((map, obj) => ((map[obj.id] = obj), map), {});
      return {
        ...indexedPosts
      };
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    case REMOVE_COMMENT:
      if (action.comment.deleted) {
        delete state[`${action.comment.id}`];
      }
      return state;
    // case SORT_COMMENTS:
    //   const sortByKey = key => (a, b) => a[key] < b[key];
    //   const commentsArray = Object.entries(state).map(([key, value]) => value);
    //   const sorted = commentsArray.sort(sortByKey(action.sortType));
    //   console.log(JSON.stringify(commentsArray));
    //   return sorted;

    default:
      return state;
  }
};

export default comments;
