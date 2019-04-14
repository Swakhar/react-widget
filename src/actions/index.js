export const REQUEST_WIDGETS = 'REQUEST_WIDGETS';
export const RECEIVE_WIDGETS = 'RECEIVE_WIDGETS';

export const requestVisibleWidgets = () => ({
  type: REQUEST_WIDGETS,
});

export const receivedVisibleWidgets = json => ({
  type: RECEIVE_WIDGETS,
  json,
});

export function selectBook (book) {
  return {
    type: 'SAVE_LOGIN_CREDENTIAL',
    payload: book  
  }
}


export function fetchVisibleWidgets() {
  return function (dispatch) {
    dispatch(requestVisibleWidgets());
    return fetch('http://localhost:3000/api/v1/widgets/visible?client_id=e34f876cec711c5a4b63c5edc1093651b61cd57f2fc5ed864f559b0df80fd332&client_secret=ade78ffa9f5f5341a45df49e489aa0cfa0b875c5a903fbd7eaafaff122e3bf24', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(
       response => response.json(),
       error => console.log('An error occurred.', error),
   )
    .then((json) => {
       dispatch(receivedVisibleWidgets(json));
    },
   );
  };
 }
