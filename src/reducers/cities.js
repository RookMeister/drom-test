import { GET_CITIES_REQUEST, GET_CITIES_SUCCESS } from '../actions/citiesActions'

const initialState = {
  cities: [],
  isFetching: false,
}

export function citiesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CITIES_REQUEST:
      return { ...state, isFetching: true }

    case GET_CITIES_SUCCESS:
      return { ...state, cities: action.payload, isFetching: false }

    default:
      return state
  }
}
