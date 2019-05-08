import { showLoading, hideLoading } from 'react-redux-loading';
import { getCategories } from './../services/CategoriesService';
import { receiveCategories } from './categories';

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getCategories().then(res => {
      const { categories } = res.data;
      console.log(JSON.stringify(categories));
      dispatch(receiveCategories(categories));
      dispatch(hideLoading());
    });
  };
}
