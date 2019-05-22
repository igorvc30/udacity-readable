import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import categories from './categories';
import posts from './posts';
import comments from './comments';
import deleteModal from './deleteModal';

export default combineReducers({
  categories,
  posts,
  comments,
  loadingBar: loadingBarReducer,
  deleteModal
});
