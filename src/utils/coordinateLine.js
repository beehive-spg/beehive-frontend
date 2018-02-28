// import along from '@turf/along'
// import distance from '@turf/distance'
import { /*point,*/ lineString } from '@turf/helpers/index.js'

// const coordinateLine = (start, end) => {
// const startCoordinates = [start.longitude, start.latitude]
// const endCoordinates = [end.longitude, end.latitude]

// const from = point(startCoordinates)
// const to = point(endCoordinates)
// const lineDistance = distance(from, to, { units: 'meters' })

// const line = lineString([startCoordinates, endCoordinates])
// const arc = []
// for (let i = 0; i < lineDistance; i += 1.4) {
// const segment = along(line, i, { units: 'meters' })
// let coordinates = segment.geometry.coordinates.map(res => {
// return res.toFixed(5)
// })
// arc.push(coordinates)
// }

// return arc
// }

const coordinateLine = (start, end) => {
	const startCoordinates = [start.longitude, start.latitude]
	const endCoordinates = [end.longitude, end.latitude]

	const line = lineString([startCoordinates, endCoordinates])
	return line
}

export default coordinateLine
