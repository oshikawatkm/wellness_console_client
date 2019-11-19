import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import lectureReducer from './lectureReducer';
import sportReducer from './sportReducer';
import reservationReducer from './reservationReducer';

export default combineReducers({
  auth: authReducer,
  user: authReducer,
  errors: errorReducer,
  lecture: lectureReducer,
  sport: sportReducer,
  reservation: reservationReducer
});