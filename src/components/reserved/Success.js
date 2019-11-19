import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Layout, Result, Button, Icon, Row, Col, Typography } from 'antd';
import Spinner from '../common/Spinner';

const { Content } = Layout;
const { Title } = Typography;

class Success extends Component {
  render() {
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
            <Result
              status="success"
              title="予約しました!"
              subTitle="授業を予約しました。結果は授業の二週間前に反映されます。"
              extra={[
                <Button key="buy"><Icon type="rollback" />戻る</Button>,
                <Link to="/"><Button type="primary" key="console">
                  ダッシュボード
                </Button></Link>,
              ]}
            />
          </Content>
         </Col>
      </Row>
    )
  }
}

export default Success;