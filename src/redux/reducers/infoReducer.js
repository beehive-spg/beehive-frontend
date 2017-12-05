import {
	ADD_HIVES,
	UPDATE_HIVE,
	REMOVE_HIVE,
	CHANGE_SIDEBAR_INFO,
	SELECT_DRONE,
} from 'constants/actionTypes'

export default function reducer(
	state = {
		sidebarInfo: 'Drones',
		hives: [],
		hiveActionItem: {
			action: '',
			hives: null,
		},
		selectedDrone: null,
	},
	action,
) {
	switch (action.type) {
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
			const id = action.payload
			const newHives = state.hives.filter(res => res.id !== id)

			return {
				...state,
				hiveActionItem: {
					action: 'remove',
					hives: id,
				},
				hives: newHives,
			}
		}

		case CHANGE_SIDEBAR_INFO:
			return {
				...state,
				sidebarInfo: action.payload,
			}
		case SELECT_DRONE:
			return {
				...state,
				selectedDrone: action.payload,
			}
		default:
			return state
	}
}
