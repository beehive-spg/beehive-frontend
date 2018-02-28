import line from 'utils/coordinateLine'

const addDrones = drones => {
	return drones.map(drone => addDrone(drone))
}

const addDrone = drone => {
	// const { id, from, to, enddate, speed } = drone
	// const route = line(from, to)

	const { id, from, to, startdate, enddate, speed } = drone
	const route = line(from, to)
	return {
		id,
		startdate,
		enddate,
		speed,
		route,
		distance: 0,
		radius: 20,
		color: [0, 0, 0],
	}
	// return {
	// id,
	// from,
	// to,
	// route,
	// radius: 20,
	// color: [0, 0, 0],
	// }
}

export default addDrones
