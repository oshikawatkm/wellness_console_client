import axios from 'axios';

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SPORTS,
  GET_SPORT,
  SEARCH_SPORTS,
  SPORT_LOADING
} from './types';


// get Lectures
export const getSports = sportData => dispatch => {
  dispatch(setSportLoading());
  axios
    .get('/api/v1/sports')
    .then(res => 
      dispatch({
        type: GET_SPORTS,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_SPORTS,
        payload: null
      })
    );
};

// get Sport
export const getSport = id => dispatch => {
  dispatch(setSportLoading());
  axios
    .get(`/api/v1/sports/${id}`)
    .then(res => 
      dispatch({
        type: GET_SPORT,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_SPORT,
        payload: null
      })
    );
};


export const searchSports = (week, time, text) => async dispatch => {
  dispatch(setSportLoading());
  axios
    .fetch(`/api/v1/sport?week=${week}&time=${time}&p=${text}`)
    .then(res => 
      dispatch({
        type: SEARCH_SPORTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SEARCH_SPORTS,
        payload: null
      })
    )
};

export const setSportLoading = () => {
  return {
    type: SPORT_LOADING
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};