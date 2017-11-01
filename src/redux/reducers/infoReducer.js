import {
	ADD_DRONE_INFO,
	UPDATE_DRONE_INFO,
	REMOVE_DRONE_INFO,
	CHANGE_INFO,
} from 'constants/actionTypes'

export default function reducer(
	state = {
		currentInfo: 'Drones',
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
		case REMOVE_DRONE_INFO: {
			const newDrones = state.drones.filter(
				res => res.id !== action.payload,
			)

			return {
				...state,
				drones: newDrones,
			}
		}
		case CHANGE_INFO:
			return {
				...state,
				currentInfo: action.payload,
			}
		default:
			return state
	}
}
