import { ADD_CUSTOMERS, REMOVE_CUSTOMER } from 'constants/actionTypes'

export function newCustomersAction(customers) {
	return dispatch => {
		dispatch({
			type: ADD_CUSTOMERS,
			payload: customers,
		})
	}
}

export function removeCustomerAction(customer) {
	return {
		type: REMOVE_CUSTOMER,
		payload: customer,
	}
}
