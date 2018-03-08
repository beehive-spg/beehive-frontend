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
		// const { costs } = hive.type[0]

		// const color = getColor(costs)
		// TODO remove, only here for the presentation
		const color = getColor(10)
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

const getColor = cost => {
	switch (true) {
		case 0 < cost && cost <= 7:
			return [50, 173, 62]
		case 7 < cost && cost <= 13:
			return [217, 71, 31]
		case 13 < cost && cost <= 20:
			return [206, 7, 4]
	}
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
