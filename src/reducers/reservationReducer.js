import { 
  ADD_RESERVATION,
  RESERVATION_LOADING,
  GET_RESERVATIONS,
  GET_RESERVATION,
  DELETE_RESERVATION
} from '../actions/types';

const initialState = {
  reservations: [],
  reservation: {},
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case RESERVATION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload,
        loading: false
      };
    case GET_RESERVATION:
      return {
        ...state,
        reservation: action.payload,
        loading: false
      };
    case ADD_RESERVATION: 
      return {
        ...state,
        reservations: [action.payload, ...state.reservations],
      };
    case DELETE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter(reservation => reservation.id !== action.payload)
      }
    default: 
      return state;
  }
}