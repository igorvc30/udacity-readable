import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Radio, Button, Input, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class DataForm extends Component {
  static propTypes = {
    id: PropTypes.string,
    commentId: PropTypes.string,
    formType: PropTypes.string.isRequired,
    handleData: PropTypes.func.isRequired
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formType, postId, commentId } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (formType === 'comment') {
          values['id'] = commentId;
          values['parentId'] = this.props.id;
        } else {
          values['id'] = postId;
        }

        this.props.dispatch(this.props.handleData(values));
        if (formType === 'post') this.props.history.push(`/`);
      }
    });
  };

  render() {
    const { categories, postId, commentId, data, formType } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 }
    };
    let formRule;
    if (formType === 'post') formRule = postId ? 'Edit' : 'Create';
    if (formType === 'comment') {
      if (postId && commentId === undefined) formRule = 'Create';
      if (commentId) formRule = 'Edit';
    }

    return (
      <div>
        <Divider orientation="left">
          <h2>{`${formRule} ${formType}`.toUpperCase()}</h2>
        </Divider>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          {formType === 'post' && (
            <>
              <Form.Item label={<b>Category</b>} {...formItemLayout}>
                {getFieldDecorator('category', {
                  initialValue: data.category,
                  rules: [{ required: true, message: 'Please select a category!' }]
                })(
                  <Radio.Group>
                    {categories.map(category => (
                      <Radio.Button key={category} value={category}>
                        {category.toUpperCase()}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item {...formItemLayout} label={<b>Title</b>}>
                {getFieldDecorator('title', {
                  initialValue: data.title,
                  rules: [
                    {
                      required: true,
                      message: 'Please input a title.'
                    }
                  ]
                })(<Input placeholder="Please input a title." />)}
              </Form.Item>
            </>
          )}

          <Form.Item {...formItemLayout} label={<b>Content</b>}>
            {getFieldDecorator('body', {
              initialValue: data.body,
              rules: [
                {
                  required: true,
                  message: 'Please input a content.'
                }
              ]
            })(<TextArea autosize={{ minRows: 4, maxRows: 10 }} />)}
          </Form.Item>
          {/* Author field should not apper at the form when it's Edit Comment action*/}
          {(formType === 'post' || (formType === 'comment' && formRule === 'Create')) && (
            <Form.Item {...formItemLayout} label={<b>Author</b>}>
              {getFieldDecorator('author', {
                initialValue: data.author,
                rules: [
                  {
                    required: true,
                    message: "Please input author's name."
                  }
                ]
              })(<Input placeholder="Please input the author's name" />)}
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
                      if (formRule === 'Edit' && formType === 'comment') {
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
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  onClick={() => {
                    if (formRule === 'Edit' && formType === 'comment') {
                      this.props.closeModal();
                    }
                  }}
                >
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

function mapStateToProps({ categories, posts, comments }, props) {
  const id = props.match ? props.match.params['id'] : props.id;
  const { formType } = props;
  console.log(formType);
  return {
    postId: id || props.id,
    categories: Object.keys(categories).map((key, index) => categories[key]),
    data: (formType === 'post' ? posts[id] : comments[props.commentId]) || {
      category: '',
      title: '',
      body: '',
      author: ''
    }
  };
}

export default connect(mapStateToProps)(Form.create({ name: 'data_form' })(DataForm));
