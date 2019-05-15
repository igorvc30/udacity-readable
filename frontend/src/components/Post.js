import React from 'react';
import { Card, Icon, Input, Badge, Row, Col } from 'antd';
import VoteButton from './VoteButton';
import ActionsButtons from './ActionsButtons';
import { handleVotePost } from '../actions/posts';
import moment from 'moment';
import { PropTypes } from 'prop-types';

const Post = props => {
  const { post } = props;
  const { TextArea } = Input;
  return (
    <Card
      title={<b>{post.title}</b>}
      actions={[
        <VoteButton data={post} handleVote={handleVotePost} />,
        <Badge count={post.commentCount}>
          <Icon type="retweet" style={{ fontSize: '24px' }} />
        </Badge>,
        <ActionsButtons post={post} />
      ]}
    >
      <TextArea
        style={{ background: 'WhiteSmoke' }}
        value={post.body}
        autosize={{ minRows: 4, maxRows: 6 }}
      />
      <Row type="flex" justify="space-between" gutter={5}>
        <Col span={14}>
          <b>Author: </b>
          {post.author}
        </Col>
        <Col style={{ textAlign: 'right', fontSize: '10px' }} span={8}>
          {moment(post.timestamp).format('LLL')}
        </Col>
      </Row>
    </Card>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
