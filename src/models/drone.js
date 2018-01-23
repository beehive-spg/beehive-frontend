import line from 'utils/coordinateLine'

const addDrones = drones => {
	return drones.map(drone => addDrone(drone))
}

const addDrone = drone => {
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
}

export default addDrones
