import React, { Component } from 'react';
import { Layout, Icon, Button } from 'antd';
import { Link } from "react-router-dom";


import UserResevations from './UserReservations';
import UserCashes from './UserCashes';

const { Content } = Layout;

class Reservations extends Component {
  render() {
    return (
      <Layout style={{ margin: "24px 16px", background: '#ECECEC' }}>
        <Content>
          <Link to="/"><Button style={{ marginBottom: 16 }}><Icon type="rollback" /> 戻る</Button></Link>
          <UserResevations />
          <div style={{marginBottom: 50}}></div>
          <UserCashes />
        </Content>
      </Layout>
    )
  }
}

export default Reservations ;