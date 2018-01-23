import { ADD_DRONES, UPDATE_DRONE, REMOVE_DRONE } from 'constants/actionTypes'

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
