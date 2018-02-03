import line from 'utils/coordinateLine'

const addDrones = drones => {
	return drones.map(drone => addDrone(drone))
}

const addDrone = drone => {
	const { id, from, to } = drone
	const route = line(from, to)

	return {
		id,
		from,
		to,
		route,
		radius: 20,
		color: [0, 0, 0],
	}
}

export default addDrones
