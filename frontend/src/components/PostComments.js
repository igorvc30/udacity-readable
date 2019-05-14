import React from 'react';
import { Comment, Tooltip, List, Icon, Badge, Divider } from 'antd';
import VoteButton from './VoteButton';
import { handleVoteComment, handleRemoveComment, handleEditComment } from '../actions/comments';
import DeleteButton from './DeleteButton';
import EditCommentButton from './EditCommentButton';
import moment from 'moment';

const PostComments = props => {
  const { comments } = props;
  const commentsArray = Object.entries(comments).map(([key, value]) => value);
  const commentsData = commentsArray.map(comment => {
    return {
      actions: [
        <VoteButton data={comment} handleVote={handleVoteComment} size="small" />,
        <Divider type="vertical" />,
        <DeleteButton id={comment.id} handleRemove={handleRemoveComment} size="small" />,
        <Divider type="vertical" />,
        <EditCommentButton id={comment.id} handleEdit={handleEditComment} size="small" />
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
            //   avatar={item.avatar}
            content={item.content}
            datetime={item.datetime}
          />
        </li>
      )}
    />
  );
};

export default PostComments;
