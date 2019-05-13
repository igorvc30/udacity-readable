import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Button, Tooltip, Row, Col, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { handlePostsCategory, handleInitialPosts, sortPosts } from '../actions/posts';
import PostsTable from './PostsTable';
import Post from './Post';

class PostsList extends Component {
  state = {
    view: 'grid'
  };

  componentWillReceiveProps(nextProps) {
    const { category } = nextProps;
    if (category !== this.props.category) {
      category
        ? this.props.dispatch(handlePostsCategory(category))
        : this.props.dispatch(handleInitialPosts());
    }
  }

  handleViewChange = e => {
    this.setState({ view: e.target.value });
  };

  handleSortChange = e => {
    const sortType = e.target.value;
    this.props.dispatch(sortPosts(sortType));
  };

  render() {
    const { posts } = this.props;
    const postsArray = Object.entries(posts).map(([key, value]) => value);
    const { view } = this.state;
    return (
      <div style={{ minHeight: 400 }}>
        <Row type="flex" justify="center" style={{ marginBottom: '20px' }}>
          <Col span={15}>
            <h1>READABLE POSTS</h1>
          </Col>
          <Col span={3}>
            <Link to="/post/new">
              <Tooltip title="Create a new post.">
                <Button
                  icon="plus"
                  type="primary"
                  onClick={() => {
                    console.log('CLICADO');
                  }}
                >
                  New post
                </Button>
              </Tooltip>
            </Link>
          </Col>
          <Col span={3}>
            <Radio.Group value={this.state.view} onChange={this.handleViewChange}>
              <span>View:&nbsp;</span>
              <Radio.Button value="grid">
                <Icon type="appstore" />
              </Radio.Button>
              <Radio.Button value="list">
                <Icon type="bars" />
              </Radio.Button>
            </Radio.Group>
          </Col>
          <Col span={3}>
            <Radio.Group onChange={this.handleSortChange}>
              <span>Sort:&nbsp;</span>
              <Radio.Button value="timestamp">
                <Icon type="calendar" />
              </Radio.Button>
              <Radio.Button value="voteScore">
                <Icon type="star" />
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        {postsArray.length > 0 && view === 'list' && <PostsTable posts={postsArray} />}
        {postsArray.length > 0 && view === 'grid' && (
          <Row gutter={20}>
            {postsArray.map(post => (
              <Col key={'col' + post.id} span={12} style={{ marginBottom: 20 }}>
                <Post post={post} />
              </Col>
            ))}
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
    posts
  };
};
export default withRouter(connect(mapStateToProps)(PostsList));
