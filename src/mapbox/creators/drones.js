import line from './route'

export function addDrones(drones) {
	return drones.map(drone => {
		const { from, to, currentPosition } = drone.route
		const route = line(currentPosition, to)

		return {
			id: drone.id,
			from,
			to,
			route,
			radius: 20,
			color: [0, 0, 0],
		}
	})
}
