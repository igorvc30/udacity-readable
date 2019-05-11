import React, { Component } from 'react';
import { Table, Button, Modal, Tag, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';

class PostsTable extends Component {
  showDeleteConfirm = id => {
    Modal.confirm({
      title: 'Are you sure delete this field?',
      // content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        // this.state.delete(id);
        console.log('delete saporra ' + id);
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
        key: 'title',
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
        key: 'author',
        render: text => <span>{text}</span>
      },
      {
        title: 'Coments',
        dataIndex: 'commentCount',
        width: 20,
        key: 'commentCount',
        render: text => <span>{text}</span>
      },
      {
        title: 'Score',
        dataIndex: 'voteScore',
        width: 20,
        key: 'voteScore',
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
        // colSpan: 6,
        width: 50,
        render: id => (
          <>
            <Button type="primary" ghost icon="like" />
            &nbsp; <Button type="danger" ghost icon="dislike" /> &nbsp;
          </>
        )
      },
      {
        title: 'Action',
        dataIndex: 'id',
        width: 80,
        render: id => (
          <>
            {/* onClick={() => this.handleEditQuestion(id)}  */}
            <Button type="danger" icon="delete" />
            <Link to={`/post/edit/${id}`}>
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

export default PostsTable;
