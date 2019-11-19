import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Layout, Form, Icon, Row, Col, Typography, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getLecture } from '../../actions/lectureActions';
import { addReservation } from '../../actions/reservationActions'
import UnixTimeToYmd from '../common/UnixTimeToYmd';
import TranslateWeek from '../common/TranslateWeek';


const { Content } = Layout;
const { Title } = Typography;

class Lecture extends Component {
  componentDidMount() {
    this.props.getLecture(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onReserveClick(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newReservation = {
      user_id: user.id,
      lecture_id: this.props.match.params.id
    }

    this.props.addReservation(this.props.match.params.id, newReservation);
    this.props.history.push(`/reservations/1/success`);
  }

  render() {
    const { lecture, loading } = this.props.lecture;
    let lectureContent;

    if (lecture === null || loading || Object.keys(lecture).length === 0) {
      lectureContent = <Spinner />
    } else {
      lectureContent = (
        <div style={{margin: "24px 0"}}>
          <Title level={2}>{lecture.Sport.name}</Title>
          <p>{lecture.Sport.teacher}</p>
          <h3>{UnixTimeToYmd(lecture.date)} ({TranslateWeek(lecture.Sport.week)}) {lecture.Sport.time}限</h3>
          <div className="buttons" style={{marginTop: 24}}>
            <Button onClick={() => this.props.history.goBack()}><Icon type="rollback" /> 戻る</Button>
            <Button type="primary" onClick={this.onReserveClick.bind(this)} style={{marginLeft: 16}} ><Icon type="check"/>予約する</Button>
          </div>
        </div>
      )
    }

    return (
      <Row>
         <Col xs={24} sm={24} md={3} lg={3} xl={3} xxl={3}></Col>
         <Col xs={24} sm={24} md={17} lg={17} xl={17} xxl={17}>
          <Content
            style={{
              background: '#fff',
              padding: 40,
              margin: 60,
              textAlign: "center"
            }}
          >
            {lectureContent}
          </Content>
         </Col>
      </Row>
    )
  }
}


Lecture.propTypes = {
  addReservation: PropTypes.func.isRequired,
  getLecture: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  lecture: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  lecture: state.lecture,
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, { getLecture, addReservation })(Lecture);