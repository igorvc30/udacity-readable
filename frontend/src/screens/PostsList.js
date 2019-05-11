import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Affix, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { handlePostsCategory, handleInitialPosts } from './../actions/posts';
import PostsTable from './../components/PostsTable';

class PostsList extends Component {
  componentWillReceiveProps(nextProps) {
    const { category } = nextProps;
    if (category !== this.props.category) {
      category
        ? this.props.dispatch(handlePostsCategory(category))
        : this.props.dispatch(handleInitialPosts());
    }
  }

  render() {
    const { category, posts } = this.props;
    const postsArray = Object.entries(posts).map(([key, value]) => value);
    return (
      <div style={{ minHeight: 400 }}>
        <PostsTable posts={postsArray} />
        <Affix style={{ position: 'absolute', right: 80, bottom: 100 }}>
          <Link to="/post/new">
            <Button
              size="large"
              icon="plus"
              type="primary"
              onClick={() => {
                console.log('CLICADO');
              }}
            >
              Add Post
            </Button>
          </Link>
        </Affix>
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
