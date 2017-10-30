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
					radius: 20,
					color: [0, 0, 0],
				},
			],
		}
	})
}
