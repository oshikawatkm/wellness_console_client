import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Layout, Form, Card, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const { Content } = Layout;
const { Title } = Typography;

class Register extends Component {
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAutheticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <Layout style={{ background: '#ECECEC', padding: '30px' }}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={6} xl={5} xxl={4}></Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={16}>
            <Card
              style={{ padding: "36px 15%"}}
            >
              <Title style={{textAlign: 'center', marginBottom: 44}}>新規登録</Title>
              <Form noValidate onSubmit={this.onSubmit}>
                 <div style={{ margin: "16px 0" }}>
                  <p>名前:</p>
                  <TextFieldGroup
                    placeholder="名前"
                    name="name"
                    value={this.state.name} 
                    onChange={this.onChange} 
                    error={errors.name}
                  />
                </div>
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
                <div style={{ margin: "16px 0" }}>
                  <p>パスワード確認:</p>
                  <TextFieldGroup
                    placeholder="パスワード確認"
                    name="password2"
                    type="password"
                    value={this.state.password2} 
                    onChange={this.onChange} 
                    error={errors.password2}
                  />
                </div>
                <Form.Item style={{ marginTop: 32 }}>
                  <Button type="primary" icon="check" htmlType="submit" block>登録する</Button>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));