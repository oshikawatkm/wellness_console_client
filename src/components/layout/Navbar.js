import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Icon, Dropdown,Popover } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMe, logoutUser } from '../../actions/authActions';

const { Header } = Layout;


const content = (
  <div>
    <p>現在通知サービスは準備中です</p>
  </div>
);

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  componentDidMount() {
    this.props.getMe();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { user } = this.props.user;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/settings">
            ログイン設定
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/cns-settings">
            CNSアカウント設定
          </Link>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.onLogoutClick.bind(this)}>
            <Icon type="logout" /> ログアウト
          </a>
        </Menu.Item>
      </Menu>
    );

    const authLinks = (
      <Menu mode="horizontal" style={{ float: "right", padding: "0 10px"}}>
        <Menu.Item key="1" style={{padding:"0 9px", top: 5, borderWidth: 0, lineHeight: '64px'}}>
        <Popover content={content} title="新着通知">
          <Icon type="bell" style={{fontSize: '20px'}} />
        </Popover>
        </Menu.Item>
        <Menu.Item key="2" style={{float: "right", marginRight: 32, padding:"0 9px", borderWidth: 0, lineHeight: '64px'}}>
          <Dropdown overlay={menu} placement="bottomRight">
            <a className="ant-dropdown-link" href="#">
              <Avatar icon="user" style={{padding:"0 9px"}}/> {user.name}
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>
    )
    
    const guestLinks = (
      <Menu mode="horizontal" style={{ float: "right"}}>
        <Menu.Item key="1" style={{ borderWidth: 0, lineHeight: '64px'}}>
          <Link to="/landing">
            WellnessConsoleとは
          </Link>
        </Menu.Item>
        <Menu.Item key="2" style={{ borderWidth: 0, lineHeight: '64px'}}>
          <Link to="/register">　
            新規登録
          </Link>
        </Menu.Item>
        <Menu.Item key="3" style={{marginRight: 32, borderWidth: 0, lineHeight: '64px'}}>
          <Link to="/login">　
            ログイン
          </Link>
        </Menu.Item>
      </Menu>
    )

    return (
      <Header style={{ zIndex:1, background: '#fff', padding: 0, boxShadow: "0px 3px 8px #f0f1f2" }}>
        {isAuthenticated ? authLinks : guestLinks}
      </ Header>
    )
  }
}


Navbar.propTypes = {
  getMe: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
});

export default connect(mapStateToProps, { getMe, logoutUser })(Navbar);