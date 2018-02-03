const addHives = hives => {
	return hives.map(hive => addHive(hive))
}

const addHive = hive => {
	const { type, location } = hive

	return {
		id: type.id,
		buildingId: hive.id,
		name: type.name,
		location: {
			address: location.address,
			longitude: location.longitude,
			latitude: location.latitude,
		},
	}
}
export default addHives
