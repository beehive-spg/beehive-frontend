import { along, lineString, lineDistance } from 'turf'

const coordinateLine = (start, end) => {
	const startCoordinates = [start.longitude, start.latitude]
	const endCoordinates = [end.longitude, end.latitude]

	const line = lineString([startCoordinates, endCoordinates])
	const distance = lineDistance(line, 'meters')

	const arc = []
	for (let i = 0; i < distance; i += 0.75) {
		const segment = along(line, i, 'meters')
		arc.push(segment)
	}

	return arc
}

export default coordinateLine
