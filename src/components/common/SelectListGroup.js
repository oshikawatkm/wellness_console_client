import React from 'react';
import { Select, Form } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

const SelectListGroup = ({
  placeholder,
  name,
  value,
  onChange,
  options,
  style
}) => {
  const selectOptions = options.map(option => (
    <Option key={option.label} value={option.label}>
      {option.label}
    </Option>
  ));
  return (
    <Select style={style} placeholder={placeholder}>
      {selectOptions}
    </Select>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired
};

export default SelectListGroup;