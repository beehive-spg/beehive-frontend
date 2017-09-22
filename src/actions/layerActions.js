import { ADD_DRONE } from 'constants/actionTypes'

export function addDrone(drone) {
	return {
		type: ADD_DRONE,
		payload: {
			drone,
		},
	}
}
