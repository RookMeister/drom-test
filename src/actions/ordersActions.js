export const PUSH_ORDER = 'PUSH_ORDER';

export function pushOrder() {
  return dispatch => {
    dispatch({ type: PUSH_ORDER, payload: 1 });
  }
}