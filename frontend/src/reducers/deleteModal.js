import { SHOW_MODAL, HIDE_MODAL } from '../actions/deleteModal';

const deleteModal = (state = { showModal: false }, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        showModal: true,
        id: action.id,
        handleRemove: action.handleRemove,
        purpose: action.purpose
      };
    case HIDE_MODAL:
      return { showModal: false };
    default:
      return state;
  }
};

export default deleteModal;
