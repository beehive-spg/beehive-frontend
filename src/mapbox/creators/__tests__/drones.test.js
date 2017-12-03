import { addDrones } from '../drones'
import line from '../route'

test('create map of drone objects', () => {
	const drones = [
		{
			id: 1,
			route: {
				from: {
					longitude: 16.3709,
					latitude: 48.2003,
				},
				to: {
					longitude: 16.3568,
					latitude: 48.1857,
				},
				currentPosition: {
					longitude: 16.3709,
					latitude: 48.2003,
				},
			},
		},
	]

	const route = line(drones[0].route.currentPosition, drones[0].route.to)
	const droneMap = [
		{
			id: 1,
			from: {
				longitude: 16.3709,
				latitude: 48.2003,
			},
			to: {
				longitude: 16.3568,
				latitude: 48.1857,
			},
			route,
			radius: 20,
			color: [0, 0, 0],
		},
	]

	expect(addDrones(drones)).toEqual(droneMap)
})
