import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal, Row, Col } from 'antd';
import { handleRemovePost } from '../actions/posts';

const ActionsButtons = props => {
  function showDeleteConfirm(postId) {
    Modal.confirm({
      title: 'Are you sure delete this post?',
      // content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        props.dispatch(handleRemovePost(postId));
      },
      onCancel: () => {
        console.log('Cancel');
      }
    });
  }
  const { postId } = props;
  return (
    <>
      <Row type="flex" justify="start" gutter={5}>
        <Col>
          <Button
            type="danger"
            icon="delete"
            onClick={() => {
              showDeleteConfirm(postId);
            }}
          />
        </Col>
        <Col>
          <Link to={`/post/edit/${postId}`}>
            <Button type="default" icon="edit" />
          </Link>
        </Col>
        <Col>
          <Button type="primary" icon="search" />
        </Col>
      </Row>
    </>
  );
};

export default connect()(ActionsButtons);
