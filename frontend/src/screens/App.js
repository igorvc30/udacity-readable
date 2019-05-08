import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from './../actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const { categories } = this.props;
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="home">
              <Icon type="home" theme="filled" style={{ fontSize: '26px' }} />
            </Menu.Item>
            {categories.map(category => (
              <Menu.Item key={category.name}>{category.name.toUpperCase()}</Menu.Item>
            ))}
          </Menu>
          <LoadingBar />
        </Header>
        <Content style={{ padding: '20px 30px 20px 30px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Developed by Igor V. Costa</Footer>
      </Layout>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: Object.keys(categories).map((key, index) => categories[key])
  };
}

export default connect(mapStateToProps)(App);
