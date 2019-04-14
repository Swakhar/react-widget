import { combineReducers } from 'redux';
import LoginCredentials from './login_credentials';

const rootReducer = combineReducers({
  loginCredentials: LoginCredentials,
});

export default rootReducer;
