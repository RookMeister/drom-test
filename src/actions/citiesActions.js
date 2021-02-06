export const GET_CITIES_REQUEST = 'GET_CITIES_REQUEST';
export const GET_DATES_REQUEST = 'GET_DATES_REQUEST';
export const SET_LOADING = 'SET_LOADING';

export function getCities() {
  return async dispatch => {
    dispatch({ type: SET_LOADING });
    const url = 'https://www.mocky.io/v2/5b34c0d82f00007400376066?mocky-delay=700ms';
    let response = await fetch(url);
    let {cities} = await response.json();
    dispatch({
      type: GET_CITIES_REQUEST,
      payload: cities,
    });
  }
}

export function getCityDate(id) {
  return async dispatch => {
    dispatch({ type: SET_LOADING });
    const url = `https://www.mocky.io/v2/${id}?mocky-delay=700ms`;
    let response = await fetch(url);
    let {data} = await response.json();

    const keyData = Object.keys(data);
    const filtersData = keyData.map((item) => {
      const hours = Object.values(data[item]);
      return {date: item, hours: hours.filter((el) => !el.is_not_free)};
    }).filter((item) => item.hours.length > 0);

    dispatch({
      type: GET_DATES_REQUEST,
      payload: filtersData,
    });
  }
}