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

const addHiveLayer = (data, onHover) => {
	return new HiveLayer({
		id: 'layer-hive',
		data,
		radiusMinPixels: 4,
		pickable: true,
		onHover,
	})
}

export default addHiveLayer
