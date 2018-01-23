import createDroneLayers from '../createDroneLayers'

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
	const layer = createDroneLayers(drones)

	expect(layer.props.data[0].color).toEqual(drones[0].color)
})

it('take drones and selected drone to change color', () => {
	const id = drones[0].id
	const layer = createDroneLayers(drones, id)

	expect(layer.props.data[0].color).not.toEqual(drones[0].color)
})
