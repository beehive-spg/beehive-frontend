import { CompositeLayer, ScatterplotLayer } from 'deck.gl'

class HiveLayer extends CompositeLayer {
	renderLayers() {
		const { data, radiusMinPixels, pickable, onHover } = this.props
		return [
			new ScatterplotLayer({
				id: 'layer-hive-outer',
				data: data.outer,
				strokeWidth: 10,
				radiusMinPixels,
				outline: true,
				pickable,
				onHover,
			}),
			new ScatterplotLayer({
				id: 'layer-hive-inner',
				data: data.inner,
				radiusMinPixels,
				outline: false,
				pickable,
				onHover,
			}),
		]
	}
}
HiveLayer.layerName = 'HiveLayer'

const hiveLayer = (hives, onHover) => {
	const dataInner = hives.map(hive => {
		return hive.data[0]
	})

	const dataOuter = hives.map(hive => {
		return hive.data[1]
	})
	const data = {
		inner: dataInner,
		outer: dataOuter,
	}
	return layer(data, onHover)
}

const layer = (data, onHover) => {
	return new HiveLayer({
		id: 'layer-hive',
		data,
		radiusMinPixels: 4,
		pickable: true,
		onHover,
	})
}

export default hiveLayer
