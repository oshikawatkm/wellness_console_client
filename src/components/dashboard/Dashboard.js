import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

import Setting from './Setting';
import Resevations from './Resevations';


class Dashboard extends Component {
  render() {
    return (
      <Layout style={{ margin: "60px 16px", background: '#ECECEC'}}>
        <Row>
          <Col xs={24} sm={24} md={17} lg={17} xl={17} xxl={17}>
            <Resevations /> 
          </Col>
          <Col  md={1} lg={1} xl={1} xxl={1}></Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
            <Setting />
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default Dashboard;