import React, { Component } from 'react';
import { Card, Icon, Input, Badge, Row, Col } from 'antd';
import VoteButton from './VoteButton';
import ActionsButtons from './ActionsButtons';
import moment from 'moment';

class Post extends Component {
  render() {
    const { post } = this.props;
    const { Meta } = Card;
    const { TextArea } = Input;
    return (
      <Card
        title={<b>{post.title}</b>}
        actions={[
          <VoteButton post={post} />,
          <Badge count={post.commentCount}>
            <Icon type="retweet" style={{ fontSize: '24px' }} />
          </Badge>,
          <ActionsButtons postId={post.id} />
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
  }
}

export default Post;
