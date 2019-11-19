import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Row, Col, Typography, Button, Input, Form  } from 'antd';
import { Link } from "react-router-dom";
import { getMe } from '../../actions/authActions';
import { connect } from 'react-redux';

const { Content } = Layout;
const { Title } = Typography;

class Setting extends Component {
  componentDidMount() {
    this.props.getMe();
  }

  render() {
    const { user, loading } = this.props.user;
    

    return (
      <Layout style={{background: '#ECECEC'}}>
        <Content style={{margin: 28}}>
          <Link to="/"><Button style={{ marginBottom: 16 }}><Icon type="rollback" /> 戻る</Button></Link>
          <Content
            style={{
              background: '#fff',
              padding: 40
            }}>
            <Title level={3} style={{textAlign: 'center'}}>CNSアカウント情報設定</Title>
            <Content style={{ padding: "24px 30%" }}>
              <div style={{margin: 20}}>
                <p>CNSアカウント名:</p>
                <Title level={4} style={{textAlign: 'center'}}>{user.cnsName ? "設定済み": "未設定"}</Title>
              </div>
              <div style={{ margin: 20 }}>
                <p>CNSパスワード:</p>
                <Title level={4} style={{textAlign: 'center'}}>{user.cnsPassword ? "設定済み": "未設定"}</Title>
              </div>
              <Row>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}></Col>
                <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}><Link to="/edit-cns-settings"><Button  type="primary" style={{marginTop: 44}}><Icon type="setting" /> 設定を変更</Button></Link></Col>
                <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}></Col>
              </Row>
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