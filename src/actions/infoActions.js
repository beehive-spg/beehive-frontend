import { CHANGE_SIDEBAR_INFO, SELECT_ROUTE } from 'constants/actionTypes'

export function changeInfo(sidebarInfo) {
	switch (sidebarInfo) {
		case 'Routes':
			sidebarInfo = 'Drone Ports'
			break
		case 'Drone Ports':
			sidebarInfo = 'Routes'
			break
		default:
			sidebarInfo = 'Routes'
			break
	}
	return {
		type: CHANGE_SIDEBAR_INFO,
		payload: sidebarInfo,
	}
}

export function selectRoute(route) {
	return {
		type: SELECT_ROUTE,
		payload: route,
	}
}