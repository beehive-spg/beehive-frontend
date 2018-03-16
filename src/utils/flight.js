// import { format, addHours } from 'date-fns'
import globalStore from 'store'
import apolloClient from 'client'
import models from 'models'
import { newRoutesAction, removeRouteAction } from 'actions/routeActions'
import { newDronesAction, removeDroneAction } from 'actions/droneActions'
import {
	newCustomersAction,
	removeCustomerAction,
} from 'actions/customerActions'
import { newOrdersAction, removeOrderAction } from 'actions/orderActions'
import { route, orderFromRoute } from 'graphql/queries'

const handleDepartures = flights => {
	flights.forEach(flight => {
		handleDeparture(flight)
	})
}
const handleDeparture = async flight => {
	const store = globalStore.getState()

	const exists = store.route.routes.find(route => route.id === flight.routeId)
	if (!exists) {
		const res = await apolloClient.query({
			query: route,
			variables: {
				id: flight.routeId,
			},
		})

		if (res.data.route.origin === 'order') {
			const orderRes = await apolloClient.query({
				query: orderFromRoute,
				variables: {
					routeId: res.data.route.id,
				},
			})

			const customer = findCustomer(res.data.route)

			globalStore.dispatch(newCustomersAction([customer]))
			globalStore.dispatch(
				newOrdersAction([orderRes.data.orderFromRoute]),
			)
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
	// TODO remove, only here for the presentation
	// const start = format(addHours(Date.now(), 1), 'x')

	const drone = {
		id: hop.id,
		from: hop.start.location,
		to: hop.end.location,
		startdate: hop.startdate,
		// TODO remove, only here for the presentation
		// startdate: start,
		enddate: hop.enddate,
		speed: hop.speed,
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

const handleArrival = drone => {
	const store = globalStore.getState()

	store.route.routes.forEach(route => {
		if (route.hops[route.hops.length - 1].id === drone) {
			globalStore.dispatch(removeRouteAction(route.id))

			const order = store.order.orders.find(
				order => order.route === route.id,
			)

			const customer = store.customer.customers.find(
				customer => customer.id === order.customer.id,
			)

			globalStore.dispatch(removeOrderAction(order.id))
			globalStore.dispatch(removeCustomerAction(customer.id))
		}
	})

	globalStore.dispatch(removeDroneAction(drone.id))
}

export { handleDepartures, handleDeparture, handleArrival }
