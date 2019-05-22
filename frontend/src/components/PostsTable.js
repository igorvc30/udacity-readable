import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import VoteButton from './VoteButton';
import ActionsButtons from './ActionsButtons';
import { handleVotePost } from '../actions/posts';

const PostsTable = ({ posts }) => {
  const postsArray = Object.keys(posts).map(key => posts[key]);
  const columns = [
    {
      title: <b>Title</b>,
      dataIndex: 'title',
      width: 320,
      key: `title`,
      render: title => <span>{title}</span>
    },
    {
      title: <b>Author</b>,
      dataIndex: 'author',
      width: 120,
      key: `author`,
      render: author => <span>{author}</span>
    },
    {
      title: <b>Coments</b>,
      dataIndex: 'commentCount',
      width: 20,
      key: `commentCount`,
      render: commentCount => <span>{commentCount}</span>
    },
    {
      title: <b>Score</b>,
      key: `score`,
      width: 50,
      render: post => <VoteButton handleVote={handleVotePost} data={post} />
    },
    {
      title: <b>Actions</b>,
      width: 80,
      key: `actions`,
      render: post => <ActionsButtons post={post} />
    }
  ];
  return <Table columns={columns} dataSource={postsArray} rowKey="id" pagination />;
};
PostsTable.propTypes = {
  posts: PropTypes.instanceOf(Object).isRequired
};

export default PostsTable;
