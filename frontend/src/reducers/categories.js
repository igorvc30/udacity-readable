/* eslint-disable no-case-declarations */
import { RECEIVE_CATEGORIES } from '../actions/categories';

const categories = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      // eslint-disable-next-line no-unused-vars
      const categoriesArray = Object.entries(action.categories).map(([key, value]) => value);
      return {
        ...action.categories
      };
    default:
      return state;
  }
};

export default categories;
