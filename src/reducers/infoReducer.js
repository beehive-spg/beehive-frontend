import { CHANGE_SIDEBAR_INFO, SELECT_ROUTE } from 'constants/actionTypes'

export default function reducer(
	state = {
		sidebarInfo: 'Routes',
		selectedRoute: null,
	},
	action,
) {
	switch (action.type) {
		case CHANGE_SIDEBAR_INFO:
			return {
				...state,
				sidebarInfo: action.payload,
			}
		case SELECT_ROUTE:
			return {
				...state,
				selectedRoute: action.payload,
			}
		default:
			return state
	}
}
