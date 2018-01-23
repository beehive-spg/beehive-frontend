import { CHANGE_SIDEBAR_INFO, SELECT_DRONE } from 'constants/actionTypes'

export default function reducer(
	state = {
		sidebarInfo: 'Drones',
		selectedDrone: null,
	},
	action,
) {
	switch (action.type) {
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
