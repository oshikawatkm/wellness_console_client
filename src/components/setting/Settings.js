import React, { Component } from 'react';
import { Layout, Modal, Icon, Row, Col, Typography, Button, Tag,  } from 'antd';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getMe } from '../../actions/authActions';

const { Content } = Layout;
const { Title } = Typography;

class Setting extends Component {
  render() {
    const { user, loading } = this.props.user;
    let reservationContent;

    return (
      <Layout style={{background: '#ECECEC'}}>
        <Content style={{margin: 28}}>
          <Link to="/"><Button style={{ marginBottom: 16 }}><Icon type="rollback" /> 戻る</Button></Link>
          <Content
            style={{
              background: '#fff',
              padding: 30
            }}>
            <Title level={3} style={{textAlign: 'center'}}>ログイン情報設定</Title>
            <Content style={{ padding: "24px 30%" }}>
              <div style={{margin: 20}}>
                <p>アカウント名:</p>
                <Title level={4} style={{textAlign: 'center'}}>{user.name}</Title>
              </div>
              <div style={{ margin: 20 }}>
                <p>メールアドレス:</p>
                <Title level={4} style={{textAlign: 'center'}}>{user.email}</Title>
              </div>
              <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}></Col>
                <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}><Link to="/edit-settings"><Button type="primary" style={{margin: "24px 0"}}><Icon type="setting" /> 設定を変更</Button></Link></Col>
                <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}></Col>
              </Row>
              <div style={{ margin: 20 }}>
                <p>パスワード:</p>
                <Title level={4} style={{textAlign: 'center'}}>設定済</Title>
                <Row>
                <Col xs={24} sm={24} md={7} lg={6} xl={6} xxl={6}></Col>
                <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}><Link to="/edit-password"><Button type="primary" style={{margin: "24px 0"}}><Icon type="setting" /> パスワードを変更</Button></Link></Col>
                <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}></Col>
              </Row>
              </div>
            </Content>
        </Content>
        </Content>
      </Layout>
    )
  }
}



Setting.propTypes = {
  getMe: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMe })(Setting);