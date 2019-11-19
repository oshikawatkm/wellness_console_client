import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const { SubMenu } = Menu;
const { Header } = Layout;

class Sidebar extends Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated) {
    return (
      <Layout >
        <Header style={{ width: 256, zIndex: 1, marginTop: -65, position: "fixed", background: '#fff', padding: "10 0", fontSize: 20, boxShadow: "2px 2px 8px #f0f1f2" }}>WellnessConsole</Header>
        <Menu
          onClick={this.handleClick}
          style={{ width: 256, height: "100%",
            position: "fixed"}}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>マイアカウント</span>
              </span>
            }
          >
            <Menu.Item key="1"><Link to="/">ダッシュボード</ Link></Menu.Item>
            <Menu.Item key="2"><Link to='/reservations'>予約状況</Link></Menu.Item>
            <Menu.Item key="3"><Link to='/calender'>マイカレンダー</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>授業予約</span>
              </span>
            }
          >
            <Menu.Item key="4"><Link to='/sports'>授業一覧</Link></Menu.Item>
            <Menu.Item key="5"><Link to='/calender'>授業カレンダー</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="setting" />
                <span>設定</span>
              </span>
            }
          >
            <Menu.Item key="6"><Link to="/cns-settings">CNSアカウント設定</ Link></Menu.Item>
              <Menu.Item key="7"><Link to="/settings">ログイン設定</ Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="8">
            <Icon type="link"></Icon> 
              <span>
                <a href="https://wellness.sfc.keio.ac.jp/v3/" style={{textDecoration: 'none', color: "rgba(0, 0, 0, 0.65)"}}　target="_blank">体育予約システム</a>
              </span>
            </Menu.Item>
        </Menu>
      </Layout>
    );
          } else { return null}
  }
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Sidebar);