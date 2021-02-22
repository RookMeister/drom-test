import { combineReducers } from 'redux';
import { ordersReducer } from './orders';

export const rootReducer = combineReducers({
  orders: ordersReducer,
});
