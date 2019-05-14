import React, { Component } from 'react';
import { Comment, Tooltip, List, Modal, Icon, Divider, Button } from 'antd';
import VoteButton from './VoteButton';
import { handleVoteComment, handleRemoveComment, handleEditComment } from '../actions/comments';
import DeleteButton from './DeleteButton';
// import EditCommentButton from './EditCommentButton';
import DataForm from './DataForm';
import moment from 'moment';

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
    let commentsArray = Object.entries(comments)
      .map(([key, value]) => value)
      .sort((a, b) => a['timestamp'] < b['timestamp']);

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
          destroyOnClose={true}
          footer={null}
          closable
          centered={true}
          width={700}
          style={{ whiteSpace: 'initial' }}
        >
          <DataForm
            commentId={commentId}
            formType="comment"
            handleData={handleEditComment}
            closeModal={this.closeModal}
          />
        </Modal>
      </>
    );
  }
}

export default PostComments;
