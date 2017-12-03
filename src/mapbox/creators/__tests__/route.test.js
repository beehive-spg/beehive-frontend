import { along, lineString, lineDistance } from 'turf'
import line from '../route'

test('create coordinate line from start to end point', () => {
	const start = {
		longitude: 16.37091,
		latitude: 48.20031,
	}
	const end = {
		longitude: 16.35681,
		latitude: 48.18571,
	}

	const route = line(start, end)

	const routeStart = route[0]
	const routeEnd = route[route.length - 1]

	expect(routeStart[0] == start.longitude).toBeTruthy()
	expect(routeStart[1] == start.latitude).toBeTruthy()
	expect(routeEnd[0] == end.longitude).toBeTruthy()
	expect(routeEnd[1] == end.latitude).toBeTruthy()
})
