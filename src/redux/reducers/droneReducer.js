import { ADD_DRONES, UPDATE_DRONE, REMOVE_DRONE } from 'constants/actionTypes'

export default function reducer(
	state = {
		drones: [],
		droneActionItem: {
			action: '',
			drones: null,
		},
	},
	action,
) {
	switch (action.type) {
		case ADD_DRONES:
			return {
				...state,
				droneActionItem: {
					action: 'add',
					drones: action.payload,
				},
				drones: [...state.drones, ...action.payload],
			}
		case UPDATE_DRONE: {
			const { index, drone } = action.payload
			const newDrones = [...state.drones]
			newDrones[index] = drone[0]

			return {
				...state,
				droneActionItem: {
					action: 'update',
					drones: drone,
				},
				drones: newDrones,
			}
		}
		case REMOVE_DRONE: {
			const id = action.payload
			const newDrones = state.drones.filter(res => res.id !== id)

			return {
				...state,
				droneActionItem: {
					action: 'remove',
					drones: id,
				},
				drones: newDrones,
			}
		}
		default:
			return state
	}
}
