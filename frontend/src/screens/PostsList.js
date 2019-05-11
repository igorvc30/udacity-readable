import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Affix, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { handlePostsCategory, handleInitialPosts } from './../actions/posts';

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
    return (
      <div style={{ minHeight: 400 }}>
        <h1>LISTAS + {category}</h1>
        <ul>
          {Object.entries(posts).map(([key, value]) => (
            <li key={value.id}>
              {value.title}
              <Link to={`/post/edit/${value.id}`}>
                <Button size="large" icon="pencil" />
              </Link>
            </li>
          ))}
        </ul>
        <Affix style={{ position: 'absolute', right: 80, bottom: 100 }}>
          <Link to="/post/new">
            <Button
              size="large"
              icon="plus"
              type="primary"
              onClick={() => {
                //   this.setState({
                //     bottom: this.state.bottom + 10,
                //   });
                console.log('CLICADO');
              }}
            >
              Post
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
