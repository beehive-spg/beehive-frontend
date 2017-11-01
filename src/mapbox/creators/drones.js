import line from './route'

export function addDrones(drones) {
	return drones.map(drone => {
		const { from, to } = drone.route
		const route = line(from, to)

		return {
			id: drone.id,
			route,
			counter: 0,
			radius: 20,
			color: [0, 0, 0],
		}
	})
}
