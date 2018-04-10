import {
	SET_DIST,
	SET_ROUT,
	SET_DRONES,
	SET_CUSTOM_ORDERS,
} from 'constants/actionTypes'

export default function reducer(
	state = {
		dist: false,
		routing: false,
		drones: 0,
		customOrders: false,
	},
	action,
) {
	switch (action.type) {
		case SET_DIST:
			return {
				...state,
				dist: action.payload,
			}
		case SET_ROUT:
			return {
				...state,
				routing: action.payload,
			}
		case SET_DRONES: {
			return {
				...state,
				routing: action.payload,
			}
		}
		case SET_CUSTOM_ORDERS: {
			return {
				...state,
				customOrders: action.payload,
			}
		}
		default:
			return state
	}
}
