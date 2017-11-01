import {
	ADD_DRONE_INFO,
	UPDATE_DRONE_INFO,
	REMOVE_DRONE_INFO,
	ADD_HIVE_INFO,
	UPDATE_HIVE_INFO,
	CHANGE_INFO,
} from 'constants/actionTypes'

export function addDroneInfo(drones) {
	return dispatch => {
		drones.forEach(drone => {
			// lookup address
			// form drone object
			const droneObject = {
				id: drone.id,
				from: drone.route.from,
				to: drone.route.to,
			}
			dispatch({
				type: ADD_DRONE_INFO,
				payload: droneObject,
			})
		})
	}
}

export function updateDroneInfo(drone) {
	// loopup address
	// from drone object
	const droneObject = {
		id: drone.id,
		from: drone.route.from,
		to: drone.route.to,
	}
	return {
		type: UPDATE_DRONE_INFO,
		payload: droneObject,
	}
}

export function removeDroneInfo(drone) {
	return {
		type: REMOVE_DRONE_INFO,
		payload: drone,
	}
}

export function addHiveInfo(hives) {
	return dispatch => {
		hives.forEach(hive => {
			const hiveObject = {
				id: hive.id,
				location: hive.location,
			}
			dispatch({
				type: ADD_HIVE_INFO,
				payload: hiveObject,
			})
		})
	}
}

export function updateHiveInfo(hive) {
	const hiveObject = {
		id: hive.id,
		location: hive.location,
	}
	return {
		type: UPDATE_HIVE_INFO,
		payload: hiveObject,
	}
}

export function changeInfo(currentInfo) {
	switch (currentInfo) {
		case 'Drones':
			currentInfo = 'Drone Ports'
			break
		case 'Drone Ports':
			currentInfo = 'Drones'
			break
		default:
			currentInfo = 'Drones'
			break
	}
	return {
		type: CHANGE_INFO,
		payload: currentInfo,
	}
}
