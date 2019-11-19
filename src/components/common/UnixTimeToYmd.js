import React from 'react';

const UnixTimeToYmd = (unixTime) => {
  let timeY, timeM, timeD, timeYMD;
  let time = new Date(unixTime);
  
  timeY = time.getFullYear();
  timeM = time.getMonth() + 1;
  timeD = time.getDate();

  timeYMD = timeY + "/" + timeM + "/" + timeD;

  return timeYMD;
}

export default UnixTimeToYmd;