import { CompositeLayer, ScatterplotLayer } from 'deck.gl'

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

	hives.forEach(hive => {
		const { longitude, latitude } = hive.location
		inner.push(innerLayerData(longitude, latitude))
		outer.push(outerLayerData(longitude, latitude))
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

const innerLayerData = (longitude, latitude) => {
	return {
		position: [longitude, latitude],
		radius: 25,
		color: [217, 71, 31],
	}
}

const outerLayerData = (longitude, latitude) => {
	return {
		position: [longitude, latitude],
		radius: 45,
		color: [217, 71, 31],
	}
}

export default hiveLayer
export { hiveLayer, layer }
