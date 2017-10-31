import { ADD_DRONE_INFO } from 'constants/actionTypes'

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
