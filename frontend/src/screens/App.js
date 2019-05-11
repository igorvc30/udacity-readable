import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleCategoriesList } from './../actions/categories';
import { handleInitialPosts, handlePostsCategory } from './../actions/posts';
import PostForm from './PostForm';
import PostList from './PostsList';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleCategoriesList());
    this.props.dispatch(handleInitialPosts());
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const { categories } = this.props;
    return (
      <Router>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              // defaultSelectedKeys={['home']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="home">
                <NavLink to="/" exact activeClassName="active">
                  <Icon type="home" theme="filled" style={{ fontSize: '26px' }} />
                </NavLink>
              </Menu.Item>
              {categories.map(category => (
                <Menu.Item key={category}>
                  <NavLink to={'/' + category} exact activeClassName="active">
                    {category.toUpperCase()}
                  </NavLink>
                </Menu.Item>
              ))}
            </Menu>
            <LoadingBar />
          </Header>
          <Content style={{ padding: '20px 30px 20px 30px', marginTop: 64 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
              <Route path="/:category?" exact component={PostList} />
              <Route path="/post/new" component={PostForm} />
              <Route path="/post/edit/:id" component={PostForm} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Developed by Igor V. Costa</Footer>
        </Layout>
      </Router>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories).map((key, index) => categories[key])
  };
}

export default connect(mapStateToProps)(App);
