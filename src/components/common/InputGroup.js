import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input } from 'antd';

const InputGroup = (
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
) => {
  return (
    <Form.Item>
      <Input 
        placeholder={placeholder} 
        name={name} 
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  )
}


InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: 'text'
};

export default InputGroup;