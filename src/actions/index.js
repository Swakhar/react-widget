export const SAVE_LOGIN_CREDENTIAL = 'SAVE_LOGIN_CREDENTIAL';
export function saveLoginCredential (data) {
  return  {
    type: SAVE_LOGIN_CREDENTIAL,
    payload: data,
  }
}
