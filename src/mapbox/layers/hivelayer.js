import { CompositeLayer, ScatterplotLayer } from 'deck.gl'

class HiveLayer extends CompositeLayer {
	renderLayers() {
		const { data, hiveId, radiusMinPixels, pickable, onHover } = this.props

		return [
			new ScatterplotLayer({
				id: `layer-hive-${hiveId}-outer`,
				data: [data[1]],
				strokeWidth: 10,
				radiusMinPixels,
				outline: true,
				pickable,
				onHover,
			}),
			new ScatterplotLayer({
				id: `layer-hive-${hiveId}-inner`,
				data: [data[0]],
				radiusMinPixels,
				outline: false,
				pickable,
				onHover,
			}),
		]
	}
}
HiveLayer.layerName = 'HiveLayer'

const addHiveLayer = (hive, onHover) => {
	return new HiveLayer({
		id: `layer-hive-${hive.id}`,
		data: hive.data,
		hiveId: hive.id,
		radiusMinPixels: 4,
		pickable: true,
		onHover,
	})
}

export default addHiveLayer
