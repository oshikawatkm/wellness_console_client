import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { Layout, Modal, Icon, Row, Col, Typography, Button, Tag } from 'antd';
import { getReservation, deleteReservation } from '../../actions/reservationActions';
import TagFactory from '../common/TagFactory';
import UnixTimeToYmd from '../common/UnixTimeToYmd';

const { Content } = Layout;
const { Title } = Typography;
const { confirm } = Modal;


class Reservation extends Component {
  componentDidMount() {
    this.props.getReservation(this.props.match.params.id);
  }

  showConfirm(e, reservation_id) {
    confirm({
      title: '本当に予約を取り消しますか？',
      content: '予約を取り消す場合はOKを押してください。',
      onOk: () => {
        console.log(this)
        this.props.deleteReservation(reservation_id);
        this.props.history.goBack()
      },
      onCancel() {},
    });
  }

  render() {
    const { reservation, loading } = this.props.reservation;
    let lecture = reservation["Lecture"];
    let reservationContent;

    if (reservation === null || loading || lecture === undefined) {
      reservationContent = <Spinner />
    } else {
      let sport =lecture["Sport"];
      reservationContent = <Content>
        <Title level={2}>{sport.name} {TagFactory(reservation.status)}</Title>
        <p>{sport.teacher}</p>
        <h3>{UnixTimeToYmd(lecture.date)} ({sport.week}) {sport.time}限</h3>
        <div className="buttons" style={{marginTop: 24}}>
          <Button onClick={() => this.props.history.goBack()}><Icon type="rollback" /> 戻る</Button>
          <Button type="danger" onClick={(e)=>this.showConfirm(e, this.props.match.params.id)} style={{marginLeft: 16}}><Icon type="close-circle" />予約取消</Button>
        </div>
      </Content>
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
            {reservationContent}
          </Content>
         </Col>
      </Row>
    )
  }
}

Reservation.propTypes = {
  deleteReservation: PropTypes.func.isRequired,
  getReservation: PropTypes.func.isRequired,
  reservation: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  reservation: state.reservation
})

export default connect(mapStateToProps, { getReservation, deleteReservation })(Reservation);