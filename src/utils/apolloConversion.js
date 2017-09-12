export default function convertHives(apolloHives) {
	const hives = []

	apolloHives.ROOT_QUERY.hives.map(h => {
		const { id } = h
		const currHive = apolloHives[id]
		const currCoordinates = apolloHives[`$${id}.coordinates`]

		const hive = {
			id: currHive.id,
			location: currHive.location,
			coordinates: {
				longitude: currCoordinates.longitude,
				latitude: currCoordinates.latitude,
			},
		}
		hives.push(hive)
	})

	return hives
}
