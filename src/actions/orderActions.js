import { ADD_ORDERS, REMOVE_ORDER } from 'constants/actionTypes'

export function newOrdersAction(orders) {
	return dispatch => {
		dispatch({
			type: ADD_ORDERS,
			payload: orders,
		})
	}
}

export function removeOrderAction(order) {
	return {
		type: REMOVE_ORDER,
		payload: order,
	}
}
