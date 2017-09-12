import { ADD_HIVE, ADD_HIVES } from 'src/constants/actionTypes'

// export function addApolloHives(apolloHives) {
// 	const hives = []

// 	apolloHives.ROOT_QUERY.hives.map(h => {
// 		const { id } = h
// 		const currHive = apolloHives[id]
// 		const currCoordinates = apolloHives[`$${id}.coordinates`]

// 		const hive = {
// 			id: currHive.id,
// 			location: currHive.location,
// 			coordinates: {
// 				longitude: currCoordinates.longitude,
// 				latitude: currCoordinates.latitude,
// 			},
// 		}
// 		hives.push(hive)
// 	})

// 	return {
// 		type: ADD_HIVES,
// 		payload: {
// 			hives,
// 		},
// 	}
// }

export function addHives(hives) {
	return {
		type: ADD_HIVES,
		payload: {
			hives,
		},
	}
}

export function addHive(hive) {
	return {
		type: ADD_HIVE,
		payload: {
			hive,
		},
	}
}
