import { ADD_CUSTOMERS, REMOVE_CUSTOMER } from 'constants/actionTypes'

export default function reducer(
	state = {
		customers: [],
		customerActionItem: {
			action: '',
			customers: [],
		},
	},
	action,
) {
	switch (action.type) {
		case ADD_CUSTOMERS:
			return {
				...state,
				customerActionItem: {
					action: 'add',
					customers: action.payload,
				},
				customers: [...state.customers, ...action.payload],
			}
		case REMOVE_CUSTOMER: {
			const id = action.payload
			const newcustomers = state.customers.filter(res => res.id !== id)

			return {
				...state,
				customerActionItem: {
					action: 'remove',
					customers: id,
				},
				customers: newcustomers,
			}
		}
		default:
			return state
	}
}
