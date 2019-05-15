import React, { Component } from 'react';
import { handleGetAllComments, handleAddComment } from '../actions/comments';
import { Divider } from 'antd';
import { connect } from 'react-redux';
import Post from './Post';
import PostComments from './PostComments';
import DataForm from './DataForm';
import Page404 from './Page404';

class PostInfo extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    if (Object.keys(dispatch).length === 0 && dispatch.constructor === Object)
      dispatch(handleGetAllComments(this.props.post.id));
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
        <PostComments comments={comments} />
        <DataForm formType="comment" id={post.id} handleData={handleAddComment} />
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
