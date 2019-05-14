import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import { PropTypes } from 'prop-types';
import DataForm from './DataForm';

const DeleteButton = props => {
  const { id, size } = props;
  let visible = false;
  return (
    <>
      <Button
        size={size}
        type="primary"
        icon="pencil"
        onClick={() => {
          visible = true;
        }}
      />
      <Modal
        visible={visible}
        destroyOnClose={true}
        footer={null}
        closable
        centered={true}
        width={700}
        style={{ whiteSpace: 'initial' }}
      >
        <DataForm commentId={id} formType="comment" handleData={props.handleEdit} />
      </Modal>
    </>
  );
};
DeleteButton.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  size: PropTypes.string,
  id: PropTypes.string.isRequired
};

DeleteButton.defaultProps = {
  size: 'default'
};
export default connect()(DeleteButton);
