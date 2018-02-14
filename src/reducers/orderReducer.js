import { ADD_ORDERS, REMOVE_ORDER } from 'constants/actionTypes'

export default function reducer(
	state = {
		orders: [],
		orderActionItem: {
			action: '',
			orders: [],
		},
	},
	action,
) {
	switch (action.type) {
		case ADD_ORDERS:
			return {
				...state,
				orderActionItem: {
					action: 'add',
					orders: action.payload,
				},
				orders: [...state.orders, ...action.payload],
			}
		case REMOVE_ORDER: {
			const id = action.payload
			const neworders = state.orders.filter(res => res.id !== id)

			return {
				...state,
				orderActionItem: {
					action: 'remove',
					orders: id,
				},
				orders: neworders,
			}
		}
		default:
			return state
	}
}
