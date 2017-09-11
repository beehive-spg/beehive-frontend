import { IconLayer } from 'deck.gl'
import beehive from 'static/beehive.png'
import ICON_MAPPING from './mappings'

const hiveLayer = (hive, onHover) => {
	const coordinates = hive.coordinates
	const data = [
		{
			position: [coordinates.longitude, coordinates.latitude],
			icon: 'hive',
			size: 200,
		},
	]

	return new IconLayer({
		id: `layer-hive-${hive.id}`,
		data,
		iconAtlas: beehive,
		iconMapping: ICON_MAPPING,
		sizeScale: 0.8,
		pickable: true,
		onHover,
	})
}

export default hiveLayer
