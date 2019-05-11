import React, { Component } from 'react';
import { Table, Button, Modal, Tag, Tooltip, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleRemovePost, handleVotePost } from '../actions/posts';

class PostsTable extends Component {
  showDeleteConfirm = postId => {
    Modal.confirm({
      title: 'Are you sure delete this post?',
      // content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.props.dispatch(handleRemovePost(postId));
      },
      onCancel: () => {
        console.log('Cancel');
      }
    });
  };

  render() {
    const { posts } = this.props;
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
        dataIndex: 'voteScore',
        width: 20,
        key: 'voteScore' + Date.now(),
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
        render: score => (
          <Tag color={score >= 0 ? 'green' : 'orange'} key={score}>
            {score}
          </Tag>
        )
      },

      {
        title: 'Vote',
        dataIndex: 'id',
        width: 50,
        key: 'id' + +Date.now(),
        render: id => (
          <>
            <Button
              type="primary"
              ghost
              icon="like"
              onClick={() => {
                this.props.dispatch(handleVotePost(id, 'upVote'));
              }}
            />
            <Button
              type="danger"
              ghost
              icon="dislike"
              onClick={() => {
                this.props.dispatch(handleVotePost(id, 'downVote'));
              }}
            />
          </>
        )
      },
      {
        title: 'Action',
        dataIndex: 'id',
        width: 80,
        key: 'action' + +Date.now(),
        render: postId => (
          <>
            <Button
              type="danger"
              icon="delete"
              onClick={() => {
                this.showDeleteConfirm(postId);
              }}
            />
            <Link to={`/post/edit/${postId}`}>
              <Button type="default" icon="edit" />
            </Link>
            <Button type="primary" icon="search" />
          </>
        )
      }
    ];
    return <Table columns={columns} dataSource={posts} rowKey="id" pagination={true} />;
  }
}

export default connect()(PostsTable);
