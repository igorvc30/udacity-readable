import React from 'react';
import { connect } from 'react-redux';
import { Button, Badge } from 'antd';
import { PropTypes } from 'prop-types';

const VoteButton = props => {
  const { handleVote, size } = props;
  return (
    <>
      <Badge
        count={props.data.voteScore}
        style={{
          fontWeight: 'bold',
          backgroundColor: '#fff',
          color: '#999',
          boxShadow: '0 0 0 1px #d9d9d9 inset'
        }}
      >
        <Button
          size={size}
          type="primary"
          ghost
          icon="like"
          onClick={() => {
            props.dispatch(handleVote(props.data.id, 'upVote'));
          }}
        />
        &nbsp;
        <Button
          size={size}
          type="danger"
          ghost
          icon="dislike"
          onClick={() => {
            props.dispatch(handleVote(props.data.id, 'downVote'));
          }}
        />
      </Badge>
    </>
  );
};

VoteButton.propTypes = {
  handleVote: PropTypes.func.isRequired,
  size: PropTypes.string,
  data: PropTypes.object.isRequired
};

VoteButton.defaultProps = {
  size: 'default'
};

export default connect()(VoteButton);
