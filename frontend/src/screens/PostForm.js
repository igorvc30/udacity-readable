import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Radio, Button, Input, Row, Col } from 'antd';
import { handleAddPost } from './../actions/posts';
import { Link, withRouter } from 'react-router-dom';

class PostForm extends Component {
  componentDidMount() {
    console.log('LISTAAAAAAAAA?');
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (this.props.id) {
          console.log('ATUALIZAR POST');
        } else {
          this.props.dispatch(handleAddPost(values));
        }
        this.props.history.push(`/`);
      }
    });
  };

  render() {
    const { categories, id } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 }
    };
    const formRule = id ? 'Edit' : 'Create';
    return (
      <div style={{ minHeight: 400 }}>
        <h1 style={{ textAlign: 'center' }}>{formRule.toUpperCase()} POST</h1>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Form.Item label={<b>Category</b>} {...formItemLayout}>
            {getFieldDecorator('category', {
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
              rules: [
                {
                  required: true,
                  message: "Please input post's title."
                }
              ]
            })(<Input placeholder="Please input post's title." />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<b>Content</b>}>
            {getFieldDecorator('body', {
              rules: [
                {
                  required: true,
                  message: "Please input post's content."
                }
              ]
            })(<TextArea autosize={{ minRows: 4, maxRows: 10 }} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={<b>Author</b>}>
            {getFieldDecorator('author', {
              rules: [
                {
                  required: true,
                  message: "Please input author's name."
                }
              ]
            })(<Input placeholder="Please input the author's name" />)}
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

function mapStateToProps({ categories }, props) {
  const { id } = props.match.params;
  return {
    id,
    categories: Object.keys(categories).map((key, index) => categories[key])
  };
}

export default connect(mapStateToProps)(Form.create({ name: 'post_form' })(PostForm));
