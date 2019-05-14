import React, { Component } from 'react';
import { Table, Tooltip, Icon } from 'antd';
import VoteButton from './VoteButton';
import ActionsButtons from './ActionsButtons';
import { handleVotePost } from '../actions/posts';

const PostsTable = props => {
  const { posts } = props;
  const columns = [
    {
      title: (
        <Tooltip title="Sort by date">
          <span>
            Title <Icon type="calendar" />
          </span>
        </Tooltip>
      ),
      dataIndex: 'timestamp',
      width: 320,
      key: 'title' + Date.now(),
      sorter: (a, b) => {
        if (a.timestamp < b.timestamp) {
          return -1;
        }
        if (a.timestamp > b.timestamp) {
          return 1;
        }
        return 0;
      },
      sortDirections: ['ascend', 'descend'],
      render: (text, row) => <span>{row.title}</span>
    },
    {
      title: 'Author',
      dataIndex: 'author',
      width: 120,
      key: 'author' + Date.now(),
      render: text => <span>{text}</span>
    },
    {
      title: 'Coments',
      dataIndex: 'commentCount',
      width: 20,
      key: 'commentCount' + Date.now(),
      render: text => <span>{text}</span>
    },
    {
      title: 'Score',
      key: 'score' + Date.now(),
      width: 50,
      sorter: (a, b) => {
        if (a.voteScore < b.voteScore) {
          return -1;
        }
        if (a.voteScore > b.voteScore) {
          return 1;
        }
        return 0;
      },
      sortDirections: ['ascend', 'descend'],
      render: post => <VoteButton handleVote={handleVotePost} data={post} />
    },
    {
      title: 'Action',
      // dataIndex: 'id',
      width: 80,
      key: 'action' + +Date.now(),
      render: post => <ActionsButtons post={post} />
    }
  ];
  return <Table columns={columns} dataSource={posts} rowKey="id" pagination={true} />;
};

export default PostsTable;
