import { getCategories } from './../services/CategoriesService';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  };
}

export function handleCategoriesList() {
  return dispatch => {
    dispatch(showLoading());
    return getCategories()
      .then(res => {
        const { categories } = res.data;
        const categoryArray = Object.keys(categories).map((key, index) => categories[key].name);
        console.log(JSON.stringify(categoryArray));
        dispatch(receiveCategories(categoryArray));
      })
      .finally(dispatch(hideLoading()));
  };
}
