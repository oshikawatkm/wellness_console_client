import React from 'react';
import { Tag } from 'antd';

const TagFactory = status => {
  let statusText;
  let tagColor;
  switch (status) {
    case '0':
      statusText = "予約待機中";
      tagColor = 'yellow';
      break;
    case '1':
      statusText = "予約失敗";
      tagColor = 'red';
      break;
    case '2':
      statusText = "予約成功";
      tagColor = 'green';
      break;
    default:
      console.log("Status not found")
  }

  console.log(status)
  return <Tag color={tagColor} style={{marginLeft: "10px"}}>{statusText}</Tag>;
}

export default TagFactory;