export function addHives(hives) {
	return hives.map(hive => {
		const { coordinates, location } = hive

		return {
			id: hive.id,
			location,
			data: [
				{
					// inner
					position: [coordinates.longitude, coordinates.latitude],
					radius: 15,
					color: [255, 255, 255],
				},
				{
					// outer
					position: [coordinates.longitude, coordinates.latitude],
					radius: 15,
					color: [217, 71, 31],
				},
			],
		}
	})
}
