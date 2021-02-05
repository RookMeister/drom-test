import { PUSH_ORDER } from '../actions/ordersActions'

const initialState = {
  orders: [],
}

export function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case PUSH_ORDER:
      return { ...state, orders: action.payload }

    default:
      return state
  }
}