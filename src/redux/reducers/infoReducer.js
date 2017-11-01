import {
	ADD_DRONE_INFO,
	UPDATE_DRONE_INFO,
	REMOVE_DRONE_INFO,
	ADD_HIVE_INFO,
	UPDATE_HIVE_INFO,
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
		case ADD_HIVE_INFO:
			return {
				...state,
				hives: [...state.hives, action.payload],
			}
		case UPDATE_HIVE_INFO: {
			const { id } = action.payload
			const newHives = [...state.hives]
			const index = newHives.findIndex(res => res.id === id)
			newHives[index] = action.payload

			return {
				...state,
				hives: newHives,
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
