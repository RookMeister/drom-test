import { ADD_ITEM, SET_SUCCESS, DEL_ITEM } from '../actions/ordersActions'

const initialState = {
  orders: [],
  isSuccess: false,
}

export function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      const arr = [...state.orders, action.payload];
      return { ...state, orders: arr };
    case DEL_ITEM:
      const orders = [...state.orders];
      orders.splice(action.payload, 1)
      return { ...state, orders: orders };
    case SET_SUCCESS:
      return { ...state, isSuccess: action.payload };
    default:
      return state;
  }
}