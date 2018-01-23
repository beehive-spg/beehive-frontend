// import rewire from 'rewire'
import addHiveLayer from '../hiveLayer'
import { __RewireAPI__ } from '../hiveLayer'
const mockOnHover = jest.fn()
const mockRenderLayer = jest.fn()

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

it('create hive layer', () => {
	const layer = addHiveLayer(data, mockOnHover)
	const layerData = layer.props.data

	expect(layer.props.onHover).toBe(mockOnHover)
	expect(layer).toHaveProperty('id', 'layer-hive')
	expect(layerData).toHaveProperty('inner', data.inner)
	expect(layerData).toHaveProperty('outer', data.outer)
})

/*
it('construct hive layer', () => {
	mockRenderLayer.mockReturnValueOnce([1, 1])
	__RewireAPI__.__set__('renderLayers', mockRenderLayer)
	const renderLayers = __RewireAPI__.__get__('renderLayers')
	const returnVal = renderLayers()

	expect(mockRenderLayer.mock.calls.length).toBe(1)
	expect(returnVal).toEqual([1, 1])
})
*/
