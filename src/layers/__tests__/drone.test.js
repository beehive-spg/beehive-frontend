import { layer, droneLayer } from 'layers/drone'

const drones = [
	{
		id: '29303796',
		from: {
			location: 'Hard Rock Café',
			longitude: 16.37574159999997,
			latitude: 48.2114105,
		},
		to: {
			location: 'Stephansplatz',
			longitude: 16.373213299999975,
			latitude: 48.2089816,
		},
		route: [['16.37574', '48.21141'], ['16.37574', '48.21140']],
		radius: 20,
		color: [0, 0, 0],
		counter: 1,
	},
]

it('take drones and create layer data from them', () => {
	const createdLayer = droneLayer(drones)

	expect(createdLayer.props.data[0].color).toEqual(drones[0].color)
})

it('take drones and selected drone to change color', () => {
	const id = drones[0].id
	const createdLayer = droneLayer(drones, id)

	expect(createdLayer.props.data[0].color).not.toEqual(drones[0].color)
})

it('create layer for drone objects', () => {
	const data = [
		{
			color: [0, 0, 0],
			radius: 20,
			position: [16.38471, 48.20188],
		},
	]

	const createdLayer = layer(data)
	const droneData = createdLayer.props.data[0]

	expect(createdLayer).toHaveProperty('id', 'layer-drone')
	expect(droneData).toHaveProperty('color', data[0].color)
	expect(droneData).toHaveProperty('radius', data[0].radius)
	expect(droneData).toHaveProperty('position', data[0].position)
})
