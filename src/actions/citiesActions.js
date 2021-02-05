export const GET_CITIES_REQUEST = 'GET_CITIES_REQUEST';
export const GET_CITIES_SUCCESS = 'GET_CITIES_SUCCESS';

export function getCities() {
  return async dispatch => {
    dispatch({ type: GET_CITIES_REQUEST });
    const url = 'https://www.mocky.io/v2/5b34c0d82f00007400376066?mocky-delay=700ms';
    let response = await fetch(url);
    let {cities} = await response.json();
    dispatch({
      type: GET_CITIES_SUCCESS,
      payload: cities,
    });
  }
}