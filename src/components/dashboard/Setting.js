import React, { Component } from 'react';
import { Layout, Button, Icon } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMe } from '../../actions/authActions';

const Content = Layout;

class Setting extends Component {
  componentDidMount() {
    this.props.getMe();
  }

  render() {
    const { user, loading } = this.props.user;
    let cnsPasswordContent;

    if (!user.cnsPassword) {
      cnsPasswordContent = <div><Icon theme="twoTone" twoToneColor="#eb2f96" type="exclamation-circle"></Icon> 未登録</div>
    } else {
      cnsPasswordContent = <div><Icon theme="twoTone" twoToneColor="#52c41a" type="check-circle"></Icon> 登録済み</div>
    }
    return (
      <Content
          style={{
            background: '#fff',
            padding: 24
          }}>
          <h3 style={{paddingBottom: 12, textAlign: 'center'}}>CNSアカウント登録状況</h3>
          <div className="cns-id"  style={{padding: 12}}>
            <p>CNSアカウントID:</p>
            <h4 style={{ textAlign: 'center' }}>{user.cnsName ? user.cnsName : "未登録"}</h4>
          </div>
          <div className="cns-password" style={{padding: 12, marginBottom: 10}}>
            <p>CNSパスワード:</p>
            <h4 style={{ textAlign: 'center' }}> {cnsPasswordContent}</h4>
          </div>
          <Link to="/cns-settings"><Button type="primary" icon="setting" block> 設定画面</Button></Link>
        </Content>
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