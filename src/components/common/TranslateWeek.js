import React from 'react'

const TranslateWeek = (week) => {
  switch(week) {
    case 'Monday':
      return "月"
      break;
    case 'Tuesday':
      return "火"
      break;
    case 'Wednesday':
      return "水"
      break;
    case 'Thursday':
      return "木"
      break;
    case 'Friday':
      return "金"
      break;
  }
}

export default TranslateWeek;