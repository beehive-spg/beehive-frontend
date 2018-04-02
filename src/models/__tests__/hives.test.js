//import { addHives } from '../hives'
import hive from 'models/hive'

it('create map of hive objects', () => {
	const hiveObjects = [
		{
			id: 1,
			location: 'stephansplatz',
			coordinates: {
				longitude: 16.37014,
				latitude: 48.20504,
			},
		},
	]

	const addedHive = hive(hiveObjects)[0]

	expect(addedHive).toHaveProperty('id', 1)
	expect(addedHive).toHaveProperty('data')
	expect(addedHive.data[0]).toHaveProperty('radius')
	expect(addedHive.data[0]).toHaveProperty('color')
	expect(addedHive.data[0]).toHaveProperty('position', [
		hiveObjects[0].coordinates.longitude,
		hiveObjects[0].coordinates.latitude,
	])
})
