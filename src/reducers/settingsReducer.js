import { SET_DIST, SET_ROUT, SET_DRONES } from 'constants/actionTypes'

export default function reducer(
	state = {
		dist: false,
		routing: false,
		drones: 0,
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
		default:
			return state
	}
}
