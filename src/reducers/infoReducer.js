import {
	CHANGE_SIDEBAR_INFO,
	SELECT_ROUTE,
	SELECT_HIVE,
} from 'constants/actionTypes'

export default function reducer(
	state = {
		sidebarInfo: 'all',
		selectedRoute: null,
		selectedHive: null,
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
		case SELECT_HIVE:
			return {
				...state,
				selectedHive: action.payload,
			}
		default:
			return state
	}
}
