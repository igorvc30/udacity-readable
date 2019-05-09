import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Affix, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';

class PostsList extends Component {
  componentDidMount() {
    console.log('rota?');
  }

  render() {
    const { category, posts } = this.props;
    return (
      <div style={{ minHeight: 400 }}>
        <h1>LISTAS + {category}</h1>
        <ul>
          {posts.map(post => (
            <li> {post.title} </li>
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
    posts: Object.keys(posts).map((key, index) => posts[key])
  };
};
export default withRouter(connect(mapStateToProps)(PostsList));
