// import { showLoading, hideLoading } from 'react-redux-loading';
// import getCategories from '../services/CategoriesService';

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const MODAL_ACTION = 'MODAL_ACTION';

export function showModal(id, handleRemove, purpose) {
  return {
    type: SHOW_MODAL,
    id,
    handleRemove,
    purpose
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  };
}

// export function handleModalAction(id, handleData) {}
