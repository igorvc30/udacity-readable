import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import { NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleCategoriesList } from '../actions/categories';
import { handleInitialPosts } from '../actions/posts';
import { handleAddPost, handleEditPost } from '../actions/posts';
import DataForm from './DataForm';
import PostList from './PostsList';
import PostInfo from './PostInfo';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleCategoriesList());
    this.props.dispatch(handleInitialPosts());
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const { categories, category } = this.props;
    return (
      <Router>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 100, width: '100%' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[`${category ? category : 'home'}`]}
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
          <Content style={{ padding: '20px 40px 20px 40px', marginTop: 64 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
              <Switch>
                <Route path="/:category?" exact component={PostList} />
                <Route
                  path="/post/new"
                  exact
                  render={props => (
                    <DataForm formType="post" handleData={handleAddPost} {...props} />
                  )}
                />
                <Route
                  path="/post/edit/:id"
                  render={props => (
                    <DataForm formType="post" handleData={handleEditPost} {...props} />
                  )}
                />
                <Route path="/:category/:id" component={PostInfo} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Developed by Igor V. Costa</Footer>
        </Layout>
      </Router>
    );
  }
}

function mapStateToProps({ categories, category }) {
  return {
    categories: Object.keys(categories).map((key, index) => categories[key]),
    category
  };
}

export default connect(mapStateToProps)(App);
