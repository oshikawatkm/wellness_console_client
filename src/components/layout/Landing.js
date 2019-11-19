import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Typography, Button, Row, Col } from 'antd';
import gifImage from '../../img/movie5.gif';
import CalenderImage from '../../img/calender.png';
import DashboardImage from '../../img/dashboard.png';
import CashesImage from '../../img/cashes.png';

const { Content } = Layout;
const { Title } = Typography;

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }


  render() {
    return (
      <Layout>
        <Content className="top" style={{padding:120}}>
          <Row>
            <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
              <img src={gifImage} alt="ダッシュボード" style={{ width: 630, marginTop: -30}} />
            </Col>
            <Col xs={24} sm={24} md={1} lg={1} xl={1} xxl={1}></Col>
            <Col xs={24} sm={24} md={9} lg={9} xl={9} xxl={9}>
            <Title style={{margin: "auto"}}>WellnessConsole</Title>
            <Title level={4} style={{marginTop: 16}}>WellnessConsoleとは？</Title>
            <p style={{ marginTop: 20 }}>慶應SFCの体育の授業において2週間以内の授業しか予約できない制限を無視し <br />学期中の全ての授業を予約可能にするツールです。</p>
            <div style={{margin: "50px 50px"}}>
              <Link to="/register" style={{margin: 8}}><Button type="primary" icon="check">新規登録</Button></Link>
              <Link to="/login"><Button type="primary" icon="login" style={{marginLeft: 60}}>ログイン</Button></Link>
          </div>
            </Col>
          </Row>
        </Content>
        <Content className="middle" style={{padding: "80px 120px", background: "#ffffff"}}>
        <Title style={{marginBottom: 60}}>機能紹介</Title>
        <Row>
          <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}></Col>
          <Col xs={24} sm={24} md={13} lg={13} xl={13} xxl={13}>
            <img src={DashboardImage} alt="ダッシュボード" style={{ width: 500}} />
          </Col>
          <Col xs={24} sm={24} md={9} lg={9} xl={9} xxl={9}>
            <Title level={4} style={{marginTop: 60}}>授業予約</Title>
            <p style={{ marginTop: 20 }}> 慶應SFCにおいて直近二週間以内の授業しか予約できないのは不便ですよね。<br /> 毎日体育システムを見に行かないといけなかったり、忘れていて気づけば予約が埋まっていたり…<br />WellnessConsoleはそんな二週間以内の制限を無視し、学期中の全ての授業を予約可能にする便利ツールです。<br />
            </p>
          </Col>
        </Row>
        <Row style={{marginTop: 160}}>
          <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}></Col>
          <Col xs={24} sm={24} md={13} lg={13} xl={13} xxl={13}>
            <img src={CalenderImage} alt="ダッシュボード" style={{ width: 500}} />
          </Col>
          <Col xs={24} sm={24} md={9} lg={9} xl={9} xxl={9}>
            <Title level={4} style={{marginTop: 60}}>授業管理カレンダー</Title>
            <p style={{ marginTop: 20 }}>予約している授業をカレンダーで管理します。 <br />自分だけの体育カレンダーで授業のうっかり欠席を防止します</p>
          </Col>
        </Row>
        <Row style={{marginTop: 160}}>
          <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}></Col>
          <Col xs={24} sm={24} md={13} lg={13} xl={13} xxl={13}>
            <img src={CashesImage} alt="ダッシュボード" style={{ width: 500}} />
          </Col>
          <Col xs={24} sm={24} md={9} lg={9} xl={9} xxl={9}>
            <Title level={4} style={{marginTop: 60}}>過去の授業の管理</Title>
            <p style={{ marginTop: 20 }}>過去に予約した授業の情報を保存し <br />出席管理のため、情報を最適化します。</p>
          </Col>
        </Row>
        </Content>
      </Layout>
    );
  }
}


Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
