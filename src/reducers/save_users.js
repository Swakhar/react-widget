import { SAVE_USERS } from '../actions';

export default function(state = [], action) {
  switch (action.type) {
    case SAVE_USERS:
       return checkExistingUsers(state, action.payload);
    default:
       return state;
  }
}

function checkExistingUsers(state, data) {
  let user_ids = state.map(a => a.id);
  if(!user_ids.includes(data.id)) {
    state.push(data);
  }
}
