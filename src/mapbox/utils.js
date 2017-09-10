export default function addCoordinates(coordinates) {
	return {
		type: 'Point',
		coordinates: [coordinates.longitude, coordinates.latitude],
	}
}
