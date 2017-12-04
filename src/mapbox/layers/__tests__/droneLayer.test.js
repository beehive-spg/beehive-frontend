import addDroneLayer from '../droneLayer'

it('create layer for drone objects', () => {
	const data = [
		{
			color: [0, 0, 0],
			radius: 20,
			position: [16.38471, 48.20188],
		},
	]

	const droneLayer = addDroneLayer(data)
	const droneData = droneLayer.props.data[0]

	expect(droneLayer).toHaveProperty('id', 'layer-drone')
	expect(droneData).toHaveProperty('color', data[0].color)
	expect(droneData).toHaveProperty('radius', data[0].radius)
	expect(droneData).toHaveProperty('position', data[0].position)
})
