import { along, lineString, lineDistance } from 'turf'

const coordinateLine = (start, end) => {
	const startCoordinates = [start.longitude, start.latitude]
	const endCoordinates = [end.longitude, end.latitude]

	const line = lineString([startCoordinates, endCoordinates])
	const distance = lineDistance(line)

	const arc = []
	for (let i = 0; i < distance; i += 0.01) {
		const segment = along(line, i)
		arc.push(segment)
	}

	return arc
}

export default coordinateLine
