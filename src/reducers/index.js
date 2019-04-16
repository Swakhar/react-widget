import { combineReducers } from 'redux';
import LoginCredentials from './login_credentials';
import SaveUsers from './save_users';

const rootReducer = combineReducers({
  loginCredentials: LoginCredentials,
  users: SaveUsers,
});

export default rootReducer;
