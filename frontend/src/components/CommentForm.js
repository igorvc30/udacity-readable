import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleEditComment, handleAddComment } from '../actions/comments';
import { getFieldInput, getFieldConfig } from './FormField';
import { Form, Button, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class CommentForm extends Component {
  static propTypes = {
    commentId: PropTypes.string,
    postId: PropTypes.string
  };

  handleSubmit = e => {
    e.preventDefault();
    const { commentId, postId, addComment, editComment } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        if (commentId) {
          values['id'] = commentId;
          editComment(values);
          this.props.closeModal();
        } else {
          values['parentId'] = postId;
          addComment(values);
        }
      }
    });
  };

  render() {
    const { commentId, comment } = this.props;
    const { form } = this.props;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 }
    };
    const formRule = commentId ? 'Edit' : 'Create';

    return (
      <div>
        <Divider orientation="left">
          <h2>{`${formRule} comment`.toUpperCase()}</h2>
        </Divider>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label={<b>Content</b>}>
            {getFieldConfig('body', comment.body, form)(getFieldInput('text'))}
          </Form.Item>
          {/* Author field should not apper at the form when it's Edit Comment action*/}
          {formRule === 'Create' && (
            <Form.Item {...formItemLayout} label={<b>Author</b>}>
              {getFieldConfig('author', comment.author, form)(getFieldInput('input'))}
            </Form.Item>
          )}
          <Row type="flex">
            <Col span={4} offset={3}>
              <Form.Item>
                <Link to="/">
                  <Button
                    type="ghost"
                    block
                    onClick={() => {
                      if (formRule === 'Edit') {
                        this.props.closeModal();
                      }
                    }}
                  >
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

function mapDispatchToProps(dispatch) {
  return {
    addComment: comment => dispatch(handleAddComment(comment)),
    editComment: comment => dispatch(handleEditComment(comment))
  };
}

function mapStateToProps({ comments }, props) {
  const { postId, commentId } = props;
  return {
    postId,
    commentId,
    comment: comments[commentId] || {
      body: '',
      author: ''
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'comment_form' })(CommentForm));
