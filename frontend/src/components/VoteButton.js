/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Badge } from 'antd';
import PropTypes from 'prop-types';

const VoteButton = ({ vote, size, data }) => {
  return (
    <>
      <Badge
        count={data.voteScore}
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
            vote(data.id, 'upVote');
          }}
        />
        &nbsp;
        <Button
          size={size}
          type="danger"
          ghost
          icon="dislike"
          onClick={() => {
            vote(data.id, 'downVote');
          }}
        />
      </Badge>
    </>
  );
};

VoteButton.propTypes = {
  handleVote: PropTypes.func.isRequired,
  size: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired
};

VoteButton.defaultProps = {
  size: 'default'
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    vote: (id, value) => dispatch(ownProps.handleVote(id, value))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(VoteButton);
