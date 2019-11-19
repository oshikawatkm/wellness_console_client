import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Card, Input, Form, Typography, Icon } from 'antd';
import PropTypes from 'prop-types';
import SelectListGroup from '../common/SelectListGroup';
import { getSports } from '../../actions/sportActions';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

class SportsSearch extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      text: '',
    }
    
    this.onChange = this.onChange.bind(this);
  };

  
  componentDidMount() {
    this.props.getSports();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    let sports = this.props.sports;
    sports = sports.filter((sport) => sport.name.toLowerCase().search( e.target.value.toLowerCase()) !== -1)
    return this.props.parent_func(sports);
  };

  render() {
    const { sports, loading } = this.props.sports;

    const weekOptions = [
      { label: '指定なし', value: 0 },
      { label: '月曜', value: 'monday' },
      { label: '火曜', value: 'tuesday' },
      { label: '水曜', value: 'wednesday' },
      { label: '木曜', value: 'thursday' },
      { label: '金曜', value: 'friday' }
    ];

    const timeOptions = [
      { label: '指定なし', value: 0 },
      { label: '2限', value: 2 },
      { label: '3限', value: 3 },
      { label: '4限', value: 4 },
      { label: '5限', value: 5 }
    ]

    return (
      <Card 
        style={{
          padding: "4px 16px",
          textAlign: 'center'
        }}
      >
        <Title level={3} style={{ marginBottom: 16 }}><Icon type="search" /> 科目検索</Title>
        <Form style={{margin: '0 100px'}} >
          <SelectListGroup
            placeholder="曜日"
            name="week"
            value={this.state.week}
            onChange={this.onChange}
            options={weekOptions}
            style={{ width: '13%', marginRight: '2%' }}
          />
          <SelectListGroup
            placeholder="時限"
            name="time"
            value={this.state.time}
            onChange={this.onChange}
            options={timeOptions}
            style={{ width: '13%', marginRight: '2%' }}
          />
          <Search
            placeholder="科目名" 
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            style={{ width: '65%' }} 
          />
        </Form>
      </Card>
    )
  }
}

SportsSearch.propTypes = {
  getSports: PropTypes.func.isRequired,
  sport: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  sports: state.sport,
  sports: state.sport.sports,
});

export default connect(mapStateToProps, { getSports })(SportsSearch);