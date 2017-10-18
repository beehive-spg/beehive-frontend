import line from './route'

export function addDrones(drones) {
	return drones.map(drone => {
		const { from, to, currentPosition } = drone.route
		const route = line(from, to)

		return {
			id: drone.id,
			route,
			counter: 0,
			data: [
				{
					position: [
						currentPosition.longitude,
						currentPosition.latitude,
					],
					radius: 10,
					color: [36, 184, 41],
				},
			],
		}
	})
}
