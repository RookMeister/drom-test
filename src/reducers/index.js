import { combineReducers } from 'redux'
import { citiesReducer } from './cities'
import { ordersReducer } from './orders'

export const rootReducer = combineReducers({
  cities: citiesReducer,
  orders: ordersReducer,
});
