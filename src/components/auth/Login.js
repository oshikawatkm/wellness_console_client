import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Layout, Form, Card, Typography, Button } from 'antd';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const { Content } = Layout;
const { Title } = Typography;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAutheticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(1)
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <Layout style={{ background: '#ECECEC', padding: '30px' }}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4}></Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={16}>
            <Card
              style={{ padding: "36px 20%"}}
            >
              <Title style={{textAlign: 'center', marginBottom: 44}}>ログイン</Title>
              <Form onSubmit={this.onSubmit}>
                <div style={{ margin: "16px 0" }}>
                  <p>メールアドレス:</p>
                  <TextFieldGroup
                    placeholder="メールアドレス"
                    name="email"
                    type="email"
                    value={this.state.email} 
                    onChange={this.onChange} 
                    error={errors.email}
                  />
                </div>
                <div style={{ margin: "16px 0" }}>
                  <p>パスワード:</p>
                  <TextFieldGroup
                    placeholder="パスワード"
                    name="password"
                    type="password"
                    value={this.state.password} 
                    onChange={this.onChange} 
                    error={errors.password}
                  />
                </div>
                <Form.Item style={{ marginTop: 32 }}>
                  <Button type="primary" icon="login" htmlType="submit" block>ログイン</Button>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={9}></Col>
                    <Col xs={24} sm={24} md={24} lg={11} xl={12} xxl={13}>
                      <p>パスワードを忘れた場合</p>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={3} xl={1} xxl={2}></Col>
                  </Row>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4}></Col>
        </Row>
      </Layout>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);