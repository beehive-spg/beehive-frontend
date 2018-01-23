import { CHANGE_SIDEBAR_INFO, SELECT_DRONE } from 'constants/actionTypes'

export function changeInfo(sidebarInfo) {
	switch (sidebarInfo) {
		case 'Drones':
			sidebarInfo = 'Drone Ports'
			break
		case 'Drone Ports':
			sidebarInfo = 'Drones'
			break
		default:
			sidebarInfo = 'Drones'
			break
	}
	return {
		type: CHANGE_SIDEBAR_INFO,
		payload: sidebarInfo,
	}
}

export function selectDrone(id) {
	return {
		type: SELECT_DRONE,
		payload: id,
	}
}
