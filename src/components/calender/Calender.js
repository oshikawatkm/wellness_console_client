import React, { Component } from 'react';
import { Calendar, Badge, Layout, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

class Calender extends Component {
  render() {
    function getListData(value) {
      let listData;
      switch (value.date()) {
        case 6:
          listData = [
            { type: 'success', content: '水泳.' },
            { type: 'success', content: 'バレーボール' },
          ];
          break;
        case 13:
          listData = [
            { type: 'warning', content: '水泳' },
            { type: 'success', content: 'バレーボール' },
            { type: 'error', content: '野球' },
          ];
          break;
        case 16:
          listData = [
            { type: 'warning', content: 'テニス' },
            { type: 'success', content: '剣道' },
            { type: 'error', content: 'トレーニング' },
            { type: 'error', content: 'バドミントン' },
          ];
          break;
        default:
      }
      return listData || [];
    }
    
    function dateCellRender(value) {
      const listData = getListData(value);
      return (
        <p>
          {listData.map(item => (
            <Badge status={item.type} text={item.content} />
          ))}
        </p>
      );
    }

    function onSelect(value) {
      console.log(value);
    }
    
    function getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    }
    
    function monthCellRender(value) {
      const num = getMonthData(value);
      return num ? (
        <div className="notes-month">
          <section>{num}</section>
          <span>Backlog number</span>
        </div>
      ) : null;
    }

    return (
      <Layout style={{ background: '#ECECEC'}}>
        <Content style={{margin: 24}}>
          <Link to="/"><Button style={{ marginBottom: 24 }}><Icon type="rollback" /> 戻る</Button></Link>
          <Content
            style={{
              background: '#fff',
              padding: 24
            }}
          >
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} onSelect={onSelect} />
          </Content>
        </Content>
      </Layout>
    )
  }
}


export default Calender;