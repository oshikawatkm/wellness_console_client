import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Row, Col, Typography, Button, Form  } from 'antd';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCnsInfo } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const { Content } = Layout;
const { Title } = Typography;

class setCnsInfo extends Component {
  constructor() {
    super();
    this.state = {
      cnsName: '',
      cnsPassword: '',
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
      cnsName: this.state.cnsName,
      cnsPassword: this.state.cnsPassword
    }

    this.props.updateCnsInfo(this.props.auth.user.id, formData);
  }

  render() {
    const { errors } = this.state;

    return (
      <Layout  style={{background: '#ECECEC'}}>
        <Content style={{margin: 28}}>
          <Link onClick={() => this.props.history.goBack()} ><Button style={{ marginBottom: 16 }}><Icon type="rollback" /> 戻る</Button></Link>
          <Content
            style={{
              background: '#fff',
              padding: 40
            }}>
            <Title level={3} style={{textAlign: 'center'}}>CNSアカウント情報設定</Title> 
            <Content style={{ padding: "24px 30%" }}>
              <Form onSubmit={this.onSubmit}>
                <div style={{margin: 20}}>
                  <p>CNSアカウント名:</p>
                  <TextFieldGroup
                      placeholder="CNSアカウント名"
                      name="cnsName"
                      value={this.state.cnsName} 
                      onChange={this.onChange} 
                      error={errors.cnsName}
                    />
                </div>
                <div style={{ margin: 20 }}>
                  <p>CNSパスワード:</p>
                  <TextFieldGroup
                      placeholder="CNSパスワード"
                      name="cnsPassword"
                      value={this.state.cnsPassword} 
                      onChange={this.onChange} 
                      error={errors.cnsPassword}
                    />
                </div>
                <Row>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}></Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}><Button type="primary" icon="check" htmlType="submit" block style={{marginTop: 44}}> 変更を保存</Button></Col>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}></Col>
                </Row>
                </Form>
            </Content>
          </Content>
        </Content>
      </Layout>
    )
  }
}

setCnsInfo.propTypes = {
  updateCnsInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { updateCnsInfo })(withRouter(setCnsInfo));