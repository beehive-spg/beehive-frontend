export function addHives(hives, onHover) {
	return hives.map(hive => {
		const { coordinates } = hive

		return {
			id: hive.id,
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
			onHover,
		}
	})
}
