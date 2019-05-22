import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PropTypes } from 'prop-types';
import { showModal } from '../actions/deleteModal';

const DeleteButton = props => {
  const { id, size, dispatch, handleRemove, purpose } = props;
  return (
    <>
      <Button
        size={size}
        type="danger"
        icon="delete"
        onClick={() => dispatch(showModal(id, handleRemove, purpose))}
      />
    </>
  );
};
DeleteButton.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  size: PropTypes.string,
  id: PropTypes.string.isRequired,
  purpose: PropTypes.string.isRequired
};

DeleteButton.defaultProps = {
  size: 'default'
};
export default connect()(DeleteButton);
