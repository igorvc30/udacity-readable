import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import { PropTypes } from 'prop-types';

const DeleteButton = props => {
  function showDeleteConfirm(id) {
    Modal.confirm({
      title: 'Are you sure delete this?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        props.dispatch(props.handleRemove(id));
      },
      onCancel: () => {
        console.log('Cancel');
      }
    });
  }
  const { id, size } = props;
  return (
    <>
      <Button
        size={size}
        type="danger"
        icon="delete"
        onClick={() => {
          showDeleteConfirm(id);
        }}
      />
    </>
  );
};
DeleteButton.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  size: PropTypes.string,
  id: PropTypes.string.isRequired
};

DeleteButton.defaultProps = {
  size: 'default'
};
export default connect()(DeleteButton);
