import { 
  SPORT_LOADING,
  GET_SPORTS,
  GET_SPORT,
  SEARCH_SPORTS
} from '../actions/types';

const initialState = {
  sports: [],
  sport: {},
  loading: false
}

export default function(state = initialState, actions) {
  switch (actions.type) {
    case SPORT_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_SPORTS:
      return {
        ...state,
        sports: actions.payload,
        loading: false
      };
    case GET_SPORT:
      return {
        ...state,
        sport: actions.payload,
        loading: false
      };
    case SEARCH_SPORTS:
      return {
        ...state,
        sports: actions.payload,
        loading: false
      };
    default: 
      return state;
  }
}