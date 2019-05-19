import React, { Component } from 'react';
import { handleGetAllComments } from '../actions/comments';
import { Divider } from 'antd';
import { connect } from 'react-redux';
import Post from './Post';
import PostComments from './PostComments';
import CommentForm from './CommentForm';
import Page404 from './Page404';

class PostInfo extends Component {
  componentWillMount() {
    const { dispatch, post } = this.props;
    if (post) dispatch(handleGetAllComments(this.props.post.id));
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
        {Object.keys(comments).length > 0 && <PostComments comments={comments} />}
        <CommentForm postId={post.id} />
      </>
    );
  }
}

const mapStateToProps = ({ posts, comments }, props) => {
  const id = props.match.params['id'];
  return {
    post: id ? posts[id] : { id: '', category: '', title: '', body: '', author: '' },
    comments
  };
};

export default connect(mapStateToProps)(PostInfo);
