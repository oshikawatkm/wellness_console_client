import React, { Component } from 'react';
import { Layout, Button, Typography, Table, Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import { getSports } from '../../actions/sportActions';
import SportsSearch from './SportsSearch';
import TranslateWeek from '../common/TranslateWeek';


const { Content } = Layout;

const renderContent = {}

const columns = [
  {
    title: '曜日',
    dataIndex: 'week',
    key: 'week',
    render: key => TranslateWeek(key) + "曜"
  },
  {
    title: '時限',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '科目名',
    dataIndex: 'name',
    key: 'name',
    render: (key,text) => <Link to={`/sports/${text.id}/lectures`}>{text.name}</Link>
  },
  {
    title: '担当教官',
    dataIndex: 'teacher',
    key: 'teacher'
  },
  {
    title: '授業一覧',
    key: 'cancel',
    render: key => <Link to={`/sports/${key.id}/lectures`}><Button type="primary">一覧</Button></Link>
  }
]



class Sports extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      filterd: ''
    }
  };

  componentDidMount() {
    this.props.getSports();
  }

  handleStateChange = (filterd) => {
    this.setState({ sport: filterd })
    this.props.sport.sports = filterd;
  };

  render() {
    const { sports, loading } = this.props.sport;
    let sportContent;

    if (sports === null || loading || this.props.sport === undefined) {
      sportContent = <Spinner />;
    } else {
      sportContent = <Table style={{background: 'rgb(255, 255, 255)'}} columns={columns} key={this.props.sport.id} dataSource={this.props.sport.sports} />;
    }

    return (
      <Layout style={{ margin: "24px 16px", background: '#ECECEC' }}>
        <Content>
          <Link to="/"><Button style={{ marginBottom: 16 }}><Icon type="rollback" /> 戻る</Button></Link>
          <SportsSearch parent_func={this.handleStateChange} />
          {sportContent}
        </Content>
      </Layout>
    )
  }
}

Sports.propTypes = {
  getSports: PropTypes.func.isRequired,
  sport: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  sport: state.sport,
  filterd: state.sport.sports
});

export default connect(mapStateToProps, { getSports })(Sports);