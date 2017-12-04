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

	const addedDrones = addDrones(drones)[0]
	expect(addedDrones).toHaveProperty('id', 1)
	expect(addedDrones).toHaveProperty('route')
	expect(addedDrones).toHaveProperty('radius')
	expect(addedDrones).toHaveProperty('color')
})
