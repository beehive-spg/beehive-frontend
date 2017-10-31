import { ADD_DRONE_INFO } from 'constants/actionTypes'

export default function reducer(
	state = {
		drones: [],
		hives: [],
	},
	action,
) {
	switch (action.type) {
		case ADD_DRONE_INFO:
			return {
				...state,
				drones: [...state.drones, action.payload],
			}
		default:
			return state
	}
}
