import { addHiveLayer } from './layers'

export default (hives, onHover) => {
	const layers = []
	hives.map(hive => layers.push(addHiveLayer(hive, onHover)))
	return layers
}
