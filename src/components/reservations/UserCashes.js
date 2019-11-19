import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Layout, Button, Typography, Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getMe } from '../../actions/authActions';
import UnixTimeToYmd from '../common/UnixTimeToYmd';
import TranslateWeek from '../common/TranslateWeek';

const { Content } = Layout;
const { Title } = Typography;

const columns = [
  {
    title: '日時',
    dataIndex: 'date',
    render: (key,text) => UnixTimeToYmd(text.Lecture.date) + "(" + TranslateWeek(text.Lecture.Sport.week) + ")" 
  },
  {
    title: '授業名',
    dataIndex: 'lecture',
    key: 'lecture',
    render: (key,text) => <Link to={`/reservations/${text.id}`}>{text.Lecture.Sport.name}</Link>
  },
  {
    title: '担当教官',
    dataIndex: 'teacher',
    render: (key,text) => text.Lecture.Sport.teacher
  },
  {
    title: '状態',
    key: 'status',
    dataIndex: 'status',
    render: status => {
        let color;
        let statusText;
        switch(status) {
          case '0':
            statusText = '予約待機中'
            color='yellow'
            break;
          case '1':
            statusText = '予約失敗'
            color='red'
            break;
          case '2':
            statusText = '予約成功'
            color='green'
            break;
          default:
            console.log("error occured");
        }
        return (<Tag color={color} key={status}>
          {statusText}
        </Tag>)
    }
  },
  {
    title: '確認 / 取消',
    key: 'cancel',
    render: (key) => <Link to={`/reservations/${key.id}`}><Button type="primary">確認</Button></Link>
  }
]


class Cashes extends Component {
  render() {
    const { user, loading } = this.props.user;
    let casheContent;

    if (user === null || loading || user["Cashes"] === undefined) {
      casheContent = <Spinner />;
    } else {
      casheContent = <Table columns={columns} key={user["Cashes"].id}  dataSource={user["Cashes"]} />
    }

    return (
      <Content
        style={{
          background: '#fff',
          padding: 24
        }}>
          <Title level={3}>過去の予約</Title>

          {casheContent}
      </Content>
    )
  }
}

Cashes.propTypes = {
  getMe: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMe })(Cashes);