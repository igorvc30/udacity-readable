import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';
import { handleRemovePost } from '../actions/posts';
import DeleteButton from './DeleteButton';

const ActionsButtons = props => {
  const { post } = props;
  return (
    <>
      <Row type="flex" justify="start" gutter={5}>
        <Col>
          <DeleteButton id={post.id} handleRemove={handleRemovePost} />
        </Col>
        <Col>
          <Link to={`/post/edit/${post.id}`}>
            <Button type="default" icon="edit" />
          </Link>
        </Col>
        <Col>
          <Link to={`/${post.category}/${post.id}`}>
            <Button type="primary" icon="search" />
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default connect()(ActionsButtons);
