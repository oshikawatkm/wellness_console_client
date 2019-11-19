import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, GET_USER, SET_CURRENT_USER, USER_LOADING } from './types';

export const registerUser = (userData, history) => dispatch => {
  axios
    .create({
      baseURL: 'http://localhost:5000'
    })
    .post('/api/v1/auth/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .create({
      baseURL: 'http://localhost:5000'
    })
    .post('/api/v1/auth/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })    
    );
};

export const updateUser = (user_id, userData) => dispatch =>  {
  axios
  .create({
    baseURL: 'http://localhost:5000'
  })
  .put(`/api/v1/auth/update-details/${user_id}`, userData)
  .then(res => this.props.history.push('/dashboard'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })    
  );
}

export const updateCnsInfo = (user_id, userData) => dispatch => {
  axios
    .create({
      baseURL: 'http://localhost:5000'
    })
    .put(`/api/v1/users/${user_id}/set-cns-info`, userData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })    
    );
}

export const getMe = () => dispatch => {
  axios
  .get('/api/v1/auth/me')
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: {}
      })
    );
}


export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}


export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};