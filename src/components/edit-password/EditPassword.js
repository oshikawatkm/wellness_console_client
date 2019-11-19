import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Row, Col, Typography, Button, Form  } from 'antd';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const { Content } = Layout;
const { Title } = Typography;

class EditPassword extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <Layout style={{background: '#ECECEC'}}>
        <Content style={{margin: 28}}>
          <Link onClick={() => this.props.history.goBack()} ><Button style={{ marginBottom: 16 }}><Icon type="rollback" /> 戻る</Button></Link>
          <Content
            style={{
              background: '#fff',
              padding: 40
            }}>
            <Title level={3} style={{textAlign: 'center'}}>ログイン情報設定</Title>
            <Content style={{ padding: "24px 30%" }}>
              <Form onSubmit={this.onSubmit}>
              <div style={{margin: 20}}>
                  <p>現在のパスワード:</p>
                  <TextFieldGroup
                      placeholder="現在のパスワード"
                      name="password"
                      type="password"
                      value={this.state.password} 
                      onChange={this.onChange} 
                      error={errors.password}
                    />
                </div>
                <div style={{margin: 20}}>
                  <p>新しいパスワード:</p>
                  <TextFieldGroup
                      placeholder="新しいパスワード"
                      name="newPassword"
                      type="password"
                      value={this.state.newPassword} 
                      onChange={this.onChange} 
                      error={errors.newPassword}
                    />
                </div>
                <div style={{ margin: 20 }}>
                  <p>新しいパスワード確認:</p>
                  <TextFieldGroup
                      placeholder="新しいパスワード確認"
                      name="newPassword2"
                      type="password"
                      value={this.state.newPassword2} 
                      onChange={this.onChange} 
                      error={errors.newPassword2}
                    />
                </div>
              </Form>
            <Row>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}></Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}><Button  type="primary" style={{marginTop: 44}}><Icon type="check" /> 変更を保存</Button></Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}></Col>
            </Row>
          </Content>
        </Content>
        </Content>
      </Layout>
    )
  }
}

EditPassword.propTypes = {
  updateCnsInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { updateUser })(withRouter(EditPassword));