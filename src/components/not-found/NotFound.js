import React from 'react';
import { Result, Button } from 'antd';

export default () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
      style={{ margin: 28, background: "rgb(255, 255, 255)"}}
    />
  )
}
