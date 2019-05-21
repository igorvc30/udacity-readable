/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, Divider } from 'antd';
import { getFieldInput, getFieldConfig } from './FormField';
import { handleAddPost, handleEditPost } from '../actions/posts';

class PostForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { postId, editPost, addPost, form, history } = this.props;

    form.validateFields((err, values) => {
      const post = values;
      if (!err) {
        if (postId) {
          post.id = postId;
          editPost(post);
        } else {
          addPost(post);
        }

        history.push(`/`);
      }
    });
  };

  render() {
    const { categories, postId, post } = this.props;
    const { form } = this.props;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 }
    };
    const formRule = postId ? 'Edit' : 'Create';

    return (
      <div>
        <Divider orientation="left">
          <h2>{`${formRule} post`.toUpperCase()}</h2>
        </Divider>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Form.Item label={<b>Category</b>} {...formItemLayout}>
            {getFieldConfig('category', post.category, form)(getFieldInput('radio', categories))}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<b>Title</b>}>
            {getFieldConfig('title', post.title, form)(getFieldInput('input'))}
          </Form.Item>

          <Form.Item {...formItemLayout} label={<b>Content</b>}>
            {getFieldConfig('body', post.body, form)(getFieldInput('text'))}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<b>Author</b>}>
            {getFieldConfig('author', post.author, form)(getFieldInput('input'))}
          </Form.Item>
          <Row type="flex">
            <Col span={4} offset={3}>
              <Form.Item>
                <Link to="/">
                  <Button type="ghost" block>
                    Back
                  </Button>
                </Link>
              </Form.Item>
            </Col>
            <Col span={4} offset={8}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {formRule}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }, props) {
  const id = props.match ? props.match.params.id : props.id;
  return {
    postId: id || props.id,
    categories: Object.keys(categories).map(key => categories[key]),
    post: posts[id] || {
      category: '',
      title: '',
      body: '',
      author: ''
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch(handleAddPost(post)),
    editPost: post => dispatch(handleEditPost(post))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'post_form' })(PostForm));
