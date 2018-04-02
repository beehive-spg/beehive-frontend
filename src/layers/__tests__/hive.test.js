import { layer, hiveLayer } from 'layers/hive'
const mockOnHover = jest.fn()

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

const data = {
	inner: [
		{
			color: [255, 255, 255],
			radius: 15,
			position: [16.3658, 48.1857],
		},
	],
	outer: [
		{
			color: [217, 71, 31],
			radius: 15,
			position: [16.3658, 48.1857],
		},
	],
}

it('create hive layer data from hives', () => {
	const createdLayer = hiveLayer(hives)

	expect(createdLayer.props.data).toHaveProperty('inner', [hives[0].data[0]])
	expect(createdLayer.props.data).toHaveProperty('outer', [hives[0].data[1]])
})

it('create hive layer', () => {
	const createdLayer = layer(data, mockOnHover)
	const layerData = createdLayer.props.data

	expect(createdLayer.props.onHover).toBe(mockOnHover)
	expect(createdLayer).toHaveProperty('id', 'layer-hive')
	expect(layerData).toHaveProperty('inner', data.inner)
	expect(layerData).toHaveProperty('outer', data.outer)
})
