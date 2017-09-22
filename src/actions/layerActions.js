import { ADD_DRONE, ADD_DRONES } from 'constants/actionTypes'

export function addDrone(drone) {
	return {
		type: ADD_DRONE,
		payload: {
			drone,
		},
	}
}

export function addDrones(drones) {
	return {
		type: ADD_DRONES,
		payload: {
			drones,
		},
	}
}
