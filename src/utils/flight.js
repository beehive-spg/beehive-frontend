import apolloClient from 'client'
import { newRoutesAction, removeRouteAction } from 'actions/routeActions'
import { newDronesAction } from 'actions/droneActions'
import { route } from 'graphql/queries'
import models from 'models'

const handleDeparture = async (routes, drones, flight, dispatch) => {
	const exists = routes.find(route => route.id == flight.routeId)
	if (!exists) {
		const res = await apolloClient.query({
			query: route,
			variables: {
				id: flight.routeId,
			},
		})

		let drone = buildDrone(res.data.route, flight)
		drone = models.drone([drone])

		dispatch(newRoutesAction([res.data.route]))
		dispatch(newDronesAction(drone, drones))
		return res.data.route
	} else {
		let drone = buildDrone(exists, flight)
		drone = models.drone([drone])
		dispatch(newDronesAction(drone, drones))
		return exists
	}
}

const buildDrone = (route, flight) => {
	const hop = route.hops.find(hop => hop.id === flight.hopId)
	const drone = {
		id: hop.id,
		from: hop.start.location,
		to: hop.end.location,
	}
	return drone
}

const handleArrival = (routes, drone, dispatch) => {
	routes.forEach(route => {
		if (route.hops[route.hops.length - 1].id === drone) {
			dispatch(removeRouteAction(route.id))
		}
	})
}

export { handleDeparture, handleArrival }
