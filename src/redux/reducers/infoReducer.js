import {
	ADD_DRONES,
	UPDATE_DRONE,
	REMOVE_DRONE,
	ADD_HIVES,
	UPDATE_HIVE,
	REMOVE_HIVE,
	CHANGE_SIDEBAR_INFO,
} from 'constants/actionTypes'

export default function reducer(
	state = {
		sidebarInfo: 'Drones',
		drones: [],
		hives: [],
		droneActionItem: {
			action: '',
			drones: null,
		},
		hiveActionItem: {
			action: '',
			hives: null,
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
			const newDrones = state.drones.filter(
				res => res.id !== action.payload.id,
			)

			return {
				...state,
				drones: newDrones,
			}
		}
		case ADD_HIVES:
			return {
				...state,
				hiveActionItem: {
					action: 'add',
					hives: action.payload,
				},
				hives: [...state.hives, ...action.payload],
			}
		case UPDATE_HIVE: {
			const { index, hive } = action.payload
			const newHives = [...state.hives]
			newHives[index] = hive[0]

			return {
				...state,
				hiveActionItem: {
					action: 'update',
					hives: hive,
				},
				hives: newHives,
			}
		}
		case REMOVE_HIVE: {
			const newHives = state.hives.filter(
				res => res.id !== action.payload,
			)

			return {
				...state,
				hives: newHives,
			}
		}

		case CHANGE_SIDEBAR_INFO:
			return {
				...state,
				sidebarInfo: action.payload,
			}
		default:
			return state
	}
}
