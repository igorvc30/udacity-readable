import React from 'react';
import { handleVotePost } from '../actions/posts';
import { connect } from 'react-redux';
import { Button, Badge } from 'antd';

const VoteButton = props => (
  <>
    <Badge
      count={props.post.voteScore}
      style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
    >
      <Button
        type="primary"
        ghost
        icon="like"
        onClick={() => {
          props.dispatch(handleVotePost(props.post.id, 'upVote'));
        }}
      />
      &nbsp;
      <Button
        type="danger"
        ghost
        icon="dislike"
        onClick={() => {
          props.dispatch(handleVotePost(props.post.id, 'downVote'));
        }}
      />
    </Badge>
  </>
);

export default connect()(VoteButton);
