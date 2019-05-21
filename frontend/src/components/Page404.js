import React from 'react';
import { Row, Col } from 'antd';
import error from './error.gif';

const Page404 = () => (
  <Row type="flex" justify="space-between" align="top">
    <Col span={12}>
      <h1 style={{ fontSize: '180px', textAlign: 'right', marginRight: 20 }}>404</h1>
    </Col>
    <Col span={12}>
      <Row align="bottom">
        <h2>The post you are looking for was not found.</h2>
      </Row>
      <Row>
        <img src={error} alt="Logo" />
      </Row>
    </Col>
  </Row>
);
export default Page404;
