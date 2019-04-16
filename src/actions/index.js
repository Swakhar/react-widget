export const SAVE_LOGIN_CREDENTIAL = 'SAVE_LOGIN_CREDENTIAL';
export function saveLoginCredential (data) {
  return  {
    type: SAVE_LOGIN_CREDENTIAL,
    payload: data,
  }
}

export const SAVE_USERS = 'SAVE_USERS';
export function saveUsers (data) {
  return  {
    type: SAVE_USERS,
    payload: data,
  }
}
