import createHiveLayers from '../createHiveLayers'

const hives = [
	{
		id: '0',
		location: 'Spengergasse',
		data: [
			{
				position: [16.3568, 48.1857],
				radius: 15,
				color: [255, 255, 255],
			},
			{
				position: [16.3568, 48.1857],
				radius: 15,
				color: [217, 71, 31],
			},
		],
	},
]

it('create hive layer data from hives', () => {
	const layer = createHiveLayers(hives)

	expect(layer.props.data).toHaveProperty('inner', [hives[0].data[0]])
	expect(layer.props.data).toHaveProperty('outer', [hives[0].data[1]])
})
