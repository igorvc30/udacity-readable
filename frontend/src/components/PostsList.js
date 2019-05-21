/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Button, Tooltip, Row, Col, Icon, Divider } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { handlePostsCategory, handleInitialPosts, sortPosts } from '../actions/posts';
import PostsTable from './PostsTable';
import Post from './Post';

class PostsList extends Component {
  state = {
    view: 'grid'
  };

  componentDidUpdate(prevProps) {
    const { category, getPostCategory, getInitialPosts } = this.props;
    const prevCategory = prevProps.category;
    if (prevCategory !== category) {
      (category ? getPostCategory(category) : getInitialPosts())();
    }
  }

  handleViewChange = e => {
    this.setState({ view: e.target.value });
  };

  handleSortChange = e => {
    const { sort } = this.props;
    const sortType = e.target.value;
    sort(sortType);
  };

  render() {
    const { posts, postsIds } = this.props;
    const { view } = this.state;
    if (postsIds === undefined) {
      return <span>NADA {JSON.stringify(postsIds)}</span>;
    }
    return (
      <div style={{ minHeight: 400 }}>
        <Row type="flex" justify="start">
          <Col span={14}>
            <h1>POSTS</h1>
          </Col>
          <Col span={3}>
            <Link to="/post/new">
              <Tooltip title="Create a new post.">
                <Button icon="plus" type="primary">
                  NEW POST
                </Button>
              </Tooltip>
            </Link>
          </Col>
          <Col span={3}>
            <Radio.Group value={view} onChange={this.handleViewChange}>
              <span>VIEW:&nbsp;</span>
              <Radio.Button value="grid">
                <Icon type="appstore" />
              </Radio.Button>
              <Radio.Button value="list">
                <Icon type="bars" />
              </Radio.Button>
            </Radio.Group>
          </Col>
          <Col span={4}>
            <Radio.Group onChange={this.handleSortChange}>
              <span>SORT:&nbsp;</span>
              <Tooltip title="By date">
                <Radio.Button value="timestamp">
                  <Icon type="calendar" />
                </Radio.Button>
              </Tooltip>

              <Tooltip title="By vote score">
                <Radio.Button value="voteScore">
                  <Icon type="star" />
                </Radio.Button>
              </Tooltip>
              <Tooltip title="By comments count">
                <Radio.Button value="commentCount">
                  <Icon type="fire" theme="filled" />
                </Radio.Button>
              </Tooltip>
            </Radio.Group>
          </Col>
        </Row>
        <Divider orientation="left" />

        {postsIds.length > 0 && view === 'list' && <PostsTable posts={posts} />}
        {postsIds.length > 0 && view === 'grid' && (
          <Row gutter={20}>
            {postsIds.map(id => {
              const post = posts[id];
              return (
                <Col key={`col${post.id}`} span={12} style={{ marginBottom: 20 }}>
                  <Post post={post} />
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ posts }, props) => {
  const { category } = props.match.params;
  return {
    category,
    posts,
    postsIds: Object.keys(posts)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostCategory: category => dispatch(handlePostsCategory(category)),
    getInitialPosts: () => dispatch(handleInitialPosts()),
    sort: sortType => dispatch(sortPosts(sortType))
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostsList)
);
