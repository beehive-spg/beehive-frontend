import { addHives } from '../hives'

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

	const hive = addHives(hiveObjects)[0]

	expect(hive).toHaveProperty('id', 1)
	expect(hive).toHaveProperty('data')
	expect(hive.data[0]).toHaveProperty('radius')
	expect(hive.data[0]).toHaveProperty('color')
	expect(hive.data[0]).toHaveProperty('position', [
		hiveObjects[0].coordinates.longitude,
		hiveObjects[0].coordinates.latitude,
	])
})
