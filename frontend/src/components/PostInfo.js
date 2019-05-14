import React, { Component } from 'react';
import { handleGetAllComments, handleAddComment } from '../actions/comments';
import { connect } from 'react-redux';
import { Button, Badge } from 'antd';
import Post from './Post';
import PostComments from './PostComments';
import DataForm from './DataForm';

class PostInfo extends Component {
  componentWillMount() {
    this.props.dispatch(handleGetAllComments(this.props.post.id));
  }

  render() {
    const { post, comments } = this.props;
    return (
      <>
        <Post post={post} />
        <DataForm formType="comment" id={post.id} handleData={handleAddComment} />
        <PostComments comments={comments} />
      </>
    );
  }
}

const mapStateToProps = ({ posts, comments }, props) => {
  const id = props.match.params['id'];
  return {
    post: id ? posts[id] : { category: '', title: '', body: '', author: '' },
    comments
  };
};

export default connect(mapStateToProps)(PostInfo);
