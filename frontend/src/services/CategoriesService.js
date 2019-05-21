import HTTP from './config';

const getCategories = () => {
  return HTTP.get(`/categories`);
};

export default getCategories;
