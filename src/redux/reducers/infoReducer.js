import { ADD_DRONE_INFO, UPDATE_DRONE_INFO } from 'constants/actionTypes'

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
		case UPDATE_DRONE_INFO: {
			const { id } = action.payload
			const newDrones = [...state.drones]
			const index = newDrones.findIndex(res => res.id === id)
			newDrones[index] = action.payload

			return {
				...state,
				drones: newDrones,
			}
		}
		default:
			return state
	}
}
