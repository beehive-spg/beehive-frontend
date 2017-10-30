import client from 'client'
import { addDrones } from 'mapbox/creators/drones'
import allDrones from 'graphql/queries/all_drones.gql'

const removeDroneFromStore = drone => {
	let data = client.readQuery({
		query: allDrones,
	})

	data.drones = data.drones.filter(res => res.id !== drone.id)

	client.writeQuery({
		query: allDrones,
		data,
	})
}

const updateOrAddToStore = (drone, apolloStore, localState) => {
	const apolloIndex = apolloStore.findIndex(res => res.id === drone.id)
	const stateIndex = localState.findIndex(res => res.id === drone.id)

	const droneData = addDrones([drone])[0]

	const newApolloStore = [...apolloStore]
	const newLocalState = [...localState]

	if (apolloIndex !== -1) {
		newApolloStore[apolloIndex] = drone
	} else {
		newApolloStore.push(drone)
	}

	if (stateIndex !== -1) {
		newLocalState[stateIndex] = droneData
	} else {
		newLocalState.push(droneData)
	}

	return { newApolloStore, newLocalState }
}

export { removeDroneFromStore, updateOrAddToStore }
