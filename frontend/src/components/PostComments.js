import React, { Component } from 'react';
import { Comment, Tooltip, List, Modal, Divider, Button } from 'antd';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import VoteButton from './VoteButton';
import { handleVoteComment, handleRemoveComment } from '../actions/comments';
import DeleteButton from './DeleteButton';
import CommentForm from './CommentForm';

class PostComments extends Component {
  state = { visible: false, commentId: '' };

  showModal = commentId => {
    this.setState({
      visible: true,
      commentId
    });
  };

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { comments } = this.props;
    const { commentId, visible } = this.state;
    const commentsArray = Object.entries(comments)
      .map(([value]) => value)
      .sort((a, b) => a.timestamp < b.timestamp);

    const commentsData = commentsArray.map(comment => {
      return {
        actions: [
          <VoteButton data={comment} handleVote={handleVoteComment} size="small" />,
          <Divider type="vertical" />,
          <DeleteButton id={comment.id} handleRemove={handleRemoveComment} size="small" />,
          <Divider type="vertical" />,
          <Button icon="edit" onClick={() => this.showModal(comment.id)} size="small" />
        ],
        author: comment.author,
        content: <p>{comment.body}</p>,
        datetime: (
          <Tooltip
            title={moment()
              .subtract(1, 'days')
              .format('YYYY-MM-DD HH:mm:ss')}
          >
            <span>
              {moment(comment.timestamp)
                .startOf('hour')
                .fromNow()}
            </span>
          </Tooltip>
        )
      };
    });

    return (
      <>
        <List
          className="comment-list"
          header={`${commentsData.length} replies`}
          itemLayout="horizontal"
          dataSource={commentsData}
          renderItem={item => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
        <Modal
          visible={visible}
          destroyOnClose
          footer={null}
          closable
          centered
          width={700}
          style={{ whiteSpace: 'initial' }}
        >
          <CommentForm commentId={commentId} closeModal={this.closeModal} />
        </Modal>
      </>
    );
  }
}

PostComments.propTypes = {
  comments: PropTypes.instanceOf(Object).isRequired
};

export default PostComments;
