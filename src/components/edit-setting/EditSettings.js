import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Layout, Icon, Row, Col, Typography, Button, Form  } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const { Content } = Layout;
const { Title } = Typography;

class EditSetting extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const formData= {
      name: this.state.name,
      email: this.state.email
    }

    this.props.updateUser(this.props.auth.user.id, formData);
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
                  <p>名前:</p>
                  <TextFieldGroup
                      placeholder="名前"
                      name="name"
                      value={this.state.name} 
                      onChange={this.onChange} 
                      error={errors.name}
                    />
                </div>
                <div style={{ margin: 20 }}>
                  <p>メールアドレス:</p>
                  <TextFieldGroup
                      placeholder="メールアドレス"
                      name="email"
                      value={this.state.email} 
                      onChange={this.onChange} 
                      error={errors.email}
                    />
                </div>
                <Row>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}></Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                  <Form.Item style={{ marginTop: 32 }}>
                      <Button type="primary" icon="check" htmlType="submit" block> 変更を保存</Button>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}></Col>
                </Row>
              </Form>
          </Content>
        </Content>
        </Content>
      </Layout>
    )
  }
}


EditSetting.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { updateUser })(withRouter(EditSetting));