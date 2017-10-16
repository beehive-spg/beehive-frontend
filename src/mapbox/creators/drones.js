export function addDrone(drone) {
	const { currentPosition } = drone.route
	return {
		id: drone.id,
		data: [
			{
				position: [currentPosition.longitude, currentPosition.latitude],
				radius: 5,
				color: [36, 184, 41],
			},
		],
	}
}

export function addDrones(drones) {
	return drones.map(drone => {
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
}
