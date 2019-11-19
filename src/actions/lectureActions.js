import axios from 'axios';

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_LECTURES,
  GET_LECTURE,
  LECTURE_LOADING
} from './types';


// get Lectures
// sports/:sport_id/lectures
export const getLectures = sport_id => dispatch => {
  dispatch(setLectureLoading());
  axios
    .get(`/api/v1/sports/${sport_id}/lectures`)
    .then(res => 
      dispatch({
        type: GET_LECTURES,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_LECTURES,
        payload: null
      })
    );
};

// get Lecture
// sports/:sport_id/lecture/:id
export const getLecture = (id, sport_id) => dispatch => {
  dispatch(setLectureLoading());
  axios
    .get(`/api/v1/sports/${sport_id}/lectures/${id}`)
    .then(res => 
      dispatch({
        type: GET_LECTURE,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_LECTURE,
        payload: null
      })
    );
};


export const setLectureLoading = () => {
  return {
    type: LECTURE_LOADING
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};