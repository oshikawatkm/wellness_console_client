import axios from 'axios';

import {
  ADD_RESERVATION,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_RESERVATIONS,
  GET_RESERVATION,
  RESERVATION_LOADING,
  DELETE_RESERVATION
} from './types';


export const addReservation = (id, reservationData) => dispatch => {
  dispatch(clearErrors());
  axios
    .create({
      baseURL: 'http://localhost:5000'
    })
    .post(`/api/v1/reservations/${id}`, reservationData)
    .then(res => ({
      dispatch: ADD_RESERVATION,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const getReservations = () => dispatch => {
  dispatch(setReservationLoading());
  axios
    .get('/api/v1/reservations')
    .then(res =>
      dispatch({
        type: GET_RESERVATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RESERVATIONS,
        payload: null
      })
    );
}


export const getReservation = id => dispatch => {
  dispatch(setReservationLoading());
  axios
    .get(`/api/v1/reservations/${id}`)
    .then(res =>
      dispatch({
        type: GET_RESERVATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RESERVATION,
        payload: null
      })
    );
}

// Delete Post
export const deleteReservation = id => dispatch => {
  axios
    .delete(`/api/v1/reservations/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_RESERVATION,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: DELETE_RESERVATION,
        payload: err.response.data
      })
    );
};

export const setReservationLoading = () => {
  return {
    type: RESERVATION_LOADING
  };
};


export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
