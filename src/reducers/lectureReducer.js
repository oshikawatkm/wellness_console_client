import { 
  LECTURE_LOADING,
  GET_LECTURES,
  GET_LECTURE
} from '../actions/types';

const initialState = {
  lectures: [],
  lecture: {},
  loading: false
}

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LECTURE_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_LECTURES:
      return {
        ...state,
        lectures: actions.payload,
        loading: false
      };
    case GET_LECTURE:
      return {
        ...state,
        lecture: actions.payload,
        loading: false
      };
    default: 
      return state;
  }
}