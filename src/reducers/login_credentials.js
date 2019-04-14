import { SAVE_LOGIN_CREDENTIAL } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case SAVE_LOGIN_CREDENTIAL:
       return { ...state, credential: action.payload };
    default:
       return state;
  }
}
