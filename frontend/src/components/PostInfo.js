import React, { Component } from 'react';
import { Divider } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleGetAllComments } from '../actions/comments';
import Post from './Post';
import PostComments from './PostComments';
import CommentForm from './CommentForm';
import Page404 from './Page404';

class PostInfo extends Component {
  componentWillMount() {
    const { getAllComments, post } = this.props;
    if (post) getAllComments(post.id);
  }

  componentDidUpdate(prevProps) {
    /** This will try to get all commments when the page refreshes. */
    const { getAllComments, post } = this.props;
    if (!prevProps.post && post && post.commentCount) getAllComments(post.id);
  }

  render() {
    const { post, comments } = this.props;
    return post === undefined ? (
      <Page404 />
    ) : (
      <>
        <Divider orientation="left">
          <h1>POST INFORMATION</h1>
        </Divider>
        <Post post={post} />
        {comments.length > 0 && <PostComments comments={comments} />}
        <CommentForm postId={post.id} />
      </>
    );
  }
}

const mapStateToProps = ({ posts, comments }, props) => {
  const { id } = props.match.params;
  return {
    post: id ? posts[id] : { id: '', category: '', title: '', body: '', author: '' },
    comments: Object.values(comments)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllComments: postId => dispatch(handleGetAllComments(postId))
  };
};

PostInfo.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired,
  getAllComments: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostInfo);
