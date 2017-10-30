import client from 'client'
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

export { removeDroneFromStore }
