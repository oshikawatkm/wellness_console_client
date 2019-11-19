import React, { Component } from 'react';
import { Layout, Button, Typography, Table, Tag, Card, Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import { getSport } from '../../actions/sportActions';
import UnixTimeToYmd from '../common/UnixTimeToYmd';
import TranslateWeek from '../common/TranslateWeek';


const { Content } = Layout;
const { Title } = Typography;

const columns = [
  {
    title: '日時',
    dataIndex: 'date',
    key: 'date',
    render: (text, key) => UnixTimeToYmd(key.date) + " (" + TranslateWeek(key["Sport"].week) + ")"
  },
  {
    title: '授業名',
    dataIndex: 'lecture',
    key: 'lecture',
    render: (text, key) => <Link to={`/sports/${key["Sport"].id}/lectures/${key.id}`}>{key["Sport"].name}</Link>
  },
  {
    title: '担当教官',
    dataIndex: 'teacher',
    key: 'teacher',
    render: (text, key) => key["Sport"].teacher
  },
  {
    title: '詳細',
    key: 'cancel',
    render: (text, key) => <Link to={`/sports/${key["Sport"].id}/lectures/${key.id}`}><Button type="primary">詳細</Button></Link>
  }
]

class Lectures extends Component {
  componentDidMount() {
    this.props.getSport(this.props.match.params.sport_id);
  }

  render() {
    const { sport, loading } = this.props.sport;
    let lectureContent;
    let sportContent;

    if (sport["lectures"] === null || loading) {
      lectureContent = <Spinner />;
    } else {
      lectureContent = <Table style={{background: 'rgb(255, 255, 255)'}} columns={columns} dataSource={sport["lectures"]} pagination={false} />;
    }

    if (sport.sport === undefined || loading) {
      sportContent = <Icon type="loading" />;
    } else {
      sportContent = (
        <Card style={{ textAlign: 'center' }}>
          <Title level={2}>{sport.sport.name}</Title>
          <h1>{TranslateWeek(sport.sport.week)}曜 {sport.sport.time}限</h1>
          <p>{sport.sport.teacher}</p>
        </Card>
      );
    }

    return (
      <Layout style={{ margin: "24px 16px", background: '#ECECEC'  }}>
        <Content>
          <Button onClick={() => this.props.history.goBack()} style={{ marginBottom: 24 }}><Icon type="rollback" /> 戻る</Button>
          {sportContent}
          {lectureContent}
        </Content>
      </Layout>
    )
  }
}

Lectures.propTypes = {
  getSport: PropTypes.func.isRequired,
  sport: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  lecture: state.lecture,
  sport: state.sport,
});

export default connect(mapStateToProps, { getSport })(Lectures);