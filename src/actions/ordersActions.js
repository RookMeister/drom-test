export const ADD_ITEM = 'ADD_ITEM';
export const SET_SUCCESS = 'SET_SUCCESS';
export const DEL_ITEM = 'DEL_ITEM';

export function addItem(data) {
  return dispatch => {
    dispatch({ type: SET_SUCCESS, payload: true });
    dispatch({ type: ADD_ITEM, payload: data });
    setTimeout(() => {
      dispatch({ type: SET_SUCCESS, payload: false });
    }, 3000);
  }
}

export function delItem(index) {
  return dispatch => {
    dispatch({ type: DEL_ITEM, payload: index });
  }
}