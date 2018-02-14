import globalStore from 'store'
import apolloClient from 'client'
import models from 'models'
import { newRoutesAction, removeRouteAction } from 'actions/routeActions'
import { newDronesAction } from 'actions/droneActions'
import { newCustomersAction } from 'actions/customerActions'
import { route } from 'graphql/queries'

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

		if (res.data.route.origin === 'order') {
			const customer = findCustomer(res.data.route)
			globalStore.dispatch(newCustomersAction([customer]))
		}

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

const findCustomer = route => {
	let customers = []

	route.hops.forEach(hop => {
		const start = hop.start.type.some(
			building => building.__typename === 'Customer',
		)
			? hop.start
			: undefined
		const end = hop.end.type.some(
			building => building.__typename === 'Customer',
		)
			? hop.end
			: undefined
		customers.push(start)
		customers.push(end)
	})
	customers = [...new Set(customers)]
	customers = customers.filter(customer => customer)
	return customers[0]
}

const handleArrival = (routes, drone, dispatch) => {
	routes.forEach(route => {
		if (route.hops[route.hops.length - 1].id === drone) {
			dispatch(removeRouteAction(route.id))
		}
	})
}

export { handleDeparture, handleArrival }
