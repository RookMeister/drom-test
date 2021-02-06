import { GET_DATES_REQUEST, GET_CITIES_REQUEST, SET_LOADING } from '../actions/citiesActions'

const initialState = {
  cityOptions: [],
  dateOptions: [],
  isFetching: false,
}

export function citiesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isFetching: true }

    case GET_CITIES_REQUEST:
      return { ...state, cityOptions: action.payload, isFetching: false }

    case GET_DATES_REQUEST:
      return { ...state, dateOptions: action.payload, isFetching: false }

    default:
      return state
  }
}
