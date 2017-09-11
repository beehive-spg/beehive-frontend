import { CompositeLayer, ScatterplotLayer } from 'deck.gl'

class HiveLayer extends CompositeLayer {
	renderLayers() {
		const { data, hiveId, radiusMinPixels, pickable, onHover } = this.props

		return [
			new ScatterplotLayer({
				id: `layer-hive-outer-${hiveId}`,
				data: [data[1]],
				strokeWidth: 10,
				radiusMinPixels,
				outline: true,
				pickable,
				onHover,
			}),
			new ScatterplotLayer({
				id: `layer-hive-inner-${hiveId}`,
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
	const coordinates = hive.coordinates
	const data = [
		{
			// inner
			position: [coordinates.longitude, coordinates.latitude],
			radius: 15,
			color: [255, 255, 255],
		},
		{
			// outer
			position: [coordinates.longitude, coordinates.latitude],
			radius: 20,
			color: [217, 71, 31],
		},
	]

	return new HiveLayer({
		id: `layer-hive-${hive.id}`,
		data,
		hiveId: hive.id,
		radiusMinPixels: 5,
		pickable: true,
		onHover,
	})
}

export default addHiveLayer
