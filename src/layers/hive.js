import { CompositeLayer, ScatterplotLayer } from 'deck.gl'
import { scale } from 'chroma-js'

class HiveLayer extends CompositeLayer {
	renderLayers() {
		const { data, radiusMinPixels, pickable } = this.props
		return [
			new ScatterplotLayer({
				id: 'layer-hive-outer',
				data: data.outer,
				radiusMinPixels,
				strokeWidth: 2,
				outline: true,
			}),
			new ScatterplotLayer({
				id: 'layer-hive-inner',
				data: data.inner,
				radiusMinPixels,
				outline: false,
				pickable,
			}),
		]
	}
}
HiveLayer.layerName = 'HiveLayer'

const hiveLayer = (hives, onHover, onClick) => {
	let inner = []
	let outer = []

	const gradient = scale(['green', 'red'])

	hives.forEach(hive => {
		const { longitude, latitude } = hive.location
		const { costs } = hive.type[0]
		const color = gradient(costs / 20).rgb()

		inner.push(innerLayerData(longitude, latitude, color))
		outer.push(outerLayerData(longitude, latitude, color))
	})

	const data = {
		inner,
		outer,
	}

	return layer(data, onHover, onClick)
}

const layer = (data, onHover, onClick) => {
	return new HiveLayer({
		id: 'layer-hive',
		data,
		radiusMinPixels: 4,
		pickable: true,
		onHover,
		onClick,
	})
}

const innerLayerData = (longitude, latitude, color) => {
	return {
		position: [longitude, latitude],
		radius: 25,
		color,
	}
}

const outerLayerData = (longitude, latitude, color) => {
	return {
		position: [longitude, latitude],
		radius: 45,
		color,
	}
}

export default hiveLayer
export { hiveLayer, layer }
