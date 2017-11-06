import {
	ADD_DRONES,
	UPDATE_DRONE,
	REMOVE_DRONE,
	ADD_HIVES,
	UPDATE_HIVE,
	REMOVE_HIVE,
	CHANGE_SIDEBAR_INFO,
} from 'constants/actionTypes'

export function newDronesAction(drones, droneStore) {
	return dispatch => {
		if (drones.length === 1) {
			const index = droneStore.findIndex(res => res.id === drones[0].id)
			if (index !== -1) {
				dispatch({
					type: UPDATE_DRONE,
					payload: {
						index,
						drone: drones,
					},
				})
				return
			}
		}

		dispatch({
			type: ADD_DRONES,
			payload: drones,
		})
	}
}

export function removeDroneAction(drone) {
	return {
		type: REMOVE_DRONE,
		payload: drone,
	}
}

export function newHivesAction(hives, hiveStore) {
	return dispatch => {
		if (hives.length === 1) {
			const index = hiveStore.findIndex(res => res.id === hives[0].id)
			if (index !== -1) {
				dispatch({
					type: UPDATE_HIVE,
					payload: {
						index,
						hive: hives,
					},
				})
				return
			}
		}

		dispatch({
			type: ADD_HIVES,
			payload: hives,
		})
	}
}

export function removeHiveAction(hive) {
	return {
		type: REMOVE_HIVE,
		payload: hive,
	}
}

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
