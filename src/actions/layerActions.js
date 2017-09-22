import { ADD_DRONE, ADD_DRONES } from 'constants/actionTypes'

export function addDrone(drone) {
	const { currentPosition } = drone.route
	const droneLayer = {
		id: drone.id,
		data: [
			{
				position: [currentPosition.longitude, currentPosition.latitude],
				radius: 5,
				color: [36, 184, 41],
			},
		],
	}

	return {
		type: ADD_DRONE,
		payload: {
			droneLayer,
		},
	}
}

export function addDrones(drones) {
	const droneLayers = drones.map(drone => {
		const { currentPosition } = drone.route
		return {
			id: drone.id,
			data: [
				{
					position: [
						currentPosition.longitude,
						currentPosition.latitude,
					],
					radius: 5,
					color: [36, 184, 41],
				},
			],
		}
	})

	return {
		type: ADD_DRONES,
		payload: {
			droneLayers,
		},
	}
}
