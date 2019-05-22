import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Icon, Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading';
import { handleCategoriesList } from '../actions/categories';
import { handleInitialPosts } from '../actions/posts';
import { hideModal } from '../actions/deleteModal';
import PostList from './PostsList';
import PostInfo from './PostInfo';
import PostForm from './PostForm';

class App extends Component {
  componentDidMount() {
    const { getCategoriesList, getInitialPosts } = this.props;
    getCategoriesList();
    getInitialPosts();
  }

  showDeleteConfirm = () => {
    const { handleDelete, hideDeleteModal, deleteModal } = this.props;
    Modal.confirm({
      title: `Please, confirm that you want to delete this ${deleteModal.purpose}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        handleDelete(deleteModal.id, deleteModal.handleRemove);
        hideDeleteModal();
      },
      onCancel: () => {
        hideDeleteModal();
      }
    });
  };

  render() {
    const { Header, Content, Footer } = Layout;
    const { categories, category, deleteModal } = this.props;
    return (
      <Router>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 100, width: '100%' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[`${category}`]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="home">
                <NavLink to="/" exact activeClassName="active">
                  <Icon type="home" theme="filled" style={{ fontSize: '26px' }} />
                </NavLink>
              </Menu.Item>
              {categories.map(cat => (
                <Menu.Item key={`${cat}`}>
                  <NavLink to={`/${cat}`} exact activeClassName="active">
                    {cat.toUpperCase()}
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
                <Route path="/post/new" exact component={PostForm} />
                <Route path="/post/edit/:id" component={PostForm} />
                <Route path="/:category/:id" component={PostInfo} />
              </Switch>
              {deleteModal.showModal && this.showDeleteConfirm()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Developed by Igor V. Costa</Footer>
        </Layout>
      </Router>
    );
  }
}

function mapStateToProps({ categories, category, deleteModal }) {
  return {
    categories: Object.keys(categories).map(key => categories[key]),
    category: category || 'home',
    deleteModal
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getCategoriesList: () => dispatch(handleCategoriesList()),
    getInitialPosts: () => dispatch(handleInitialPosts()),
    handleDelete: (id, handleFunction) => dispatch(handleFunction(id)),
    hideDeleteModal: () => dispatch(hideModal())
  };
};

App.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  getCategoriesList: PropTypes.func.isRequired,
  getInitialPosts: PropTypes.func.isRequired,
  deleteModal: PropTypes.instanceOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func.isRequired,
  hideDeleteModal: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
