//import apolloClient from 'client'
import globalStore from 'store'

//import { customer } from 'graphql/queries'

const handleNewCustomer = async route => {
	const store = globalStore.getState()
	const { hive, shop } = store

	const routeObject = await route

	const exists =
		hive.hives.some(hive => existsInRoute(hive, routeObject)) ||
		shop.shops.some(shop => existsInRoute(shop, routeObject))

	console.log(exists)
	if (!exists) {
		/*
	const res = await apolloClient.query({
			query: customer,
			variables: {
				id: flight.routeId,
			},
		})
		*/
	}
}

const existsInRoute = (type, routeObject) => {
	/*
	return routeObject.hops.some(
		hop =>
			hop.start.id == type.buildingId || hop.end.id === type.buildingId,
	)
	*/
	/*
	return routeObject.hops.some(hop => {
		if (hop.start.id === type.buildingId || hop.end.id === type.buildingId)
			return hop
	})
	*/
	let building = undefined
	routeObject.hops.forEach(hop => {
		if (hop.start.id === type.buildingId) building = hop.start.id
		else if (hop.end.id === type.buildingId) building = hop.end.id
	})
	return building
}

export { handleNewCustomer }
