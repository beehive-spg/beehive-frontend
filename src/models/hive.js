const addHives = hives => {
	return hives.map(hive => addHive(hive))
}

const addHive = hive => {
	const type = hive.type[0]
	const { location } = hive

	return {
		id: type.id,
		buildingId: hive.id,
		name: type.name,
		demand: type.demand,
		location: {
			address: location.address,
			longitude: location.longitude,
			latitude: location.latitude,
		},
	}
}
export default addHives
