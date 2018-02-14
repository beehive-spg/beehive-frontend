import globalStore from 'store'
import apolloClient from 'client'
import { newRoutesAction, removeRouteAction } from 'actions/routeActions'
import { newDronesAction } from 'actions/droneActions'
import { route } from 'graphql/queries'
import models from 'models'

const handleDeparture = async flight => {
	const store = globalStore.getState()

	const exists = store.route.routes.find(route => route.id == flight.routeId)
	if (!exists) {
		const res = await apolloClient.query({
			query: route,
			variables: {
				id: flight.routeId,
			},
		})
		console.log(res)

		let drone = buildDrone(res.data.route, flight)
		drone = models.drone([drone])

		globalStore.dispatch(newRoutesAction([res.data.route]))
		globalStore.dispatch(newDronesAction(drone, store.drone.drones))
		return res.data.route
	} else {
		let drone = buildDrone(exists, flight)
		drone = models.drone([drone])
		globalStore.dispatch(newDronesAction(drone, store.drone.drones))
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
