import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Layout, Button, Typography, Table, Tag } from 'antd';
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


class Reservations extends Component {
  componentDidMount() {
    this.props.getMe();
  }



  render() {
    const { user, loading } = this.props.user;
    let reservation, sorted_reservations;
    let reservationContent;

    if (user === null || loading || user["Reservations"] === undefined) {
      reservationContent = <Spinner />;
    } else {
      reservation = user["Reservations"];
      sorted_reservations = reservation.sort((a,b) => {
         return new Date(b.Lecture.date) - new Date(a.Lecture.date)
      })
      console.log(sorted_reservations)
      reservationContent = <Table columns={columns} key={sorted_reservations.id}  dataSource={sorted_reservations} />
    }


    return (
      <Content
        style={{
          background: '#fff',
          padding: 24
        }}>
          <Title level={3}>あなたの予約一覧</Title>

          {reservationContent}
      </Content>
    )
  }
}

Reservations.propTypes = {
  getMe: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMe })(Reservations);