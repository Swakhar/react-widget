import { REQUEST_WIDGETS, RECEIVE_WIDGETS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case REQUEST_WIDGETS:
       return { ...state, loading: true };
    case RECEIVE_WIDGETS:
       return { ...state, json: action.json, loading: false };
    default:
       return state;
  }
}
