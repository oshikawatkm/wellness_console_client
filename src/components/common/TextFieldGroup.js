import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  validationStatus
}) => {
  return (
    <Form.Item
      label={label}
      help={error}
      validationStatus={validationStatus}
    >
      <Input 
        type={type}
        placeholder={placeholder}　
        name={name}
        value={value}
        onChange={onChange}
      />
    </Form.Item>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired
}

export default TextFieldGroup;