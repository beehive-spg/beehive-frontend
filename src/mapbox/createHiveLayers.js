import { addHiveLayer } from './layers'

export default (hives, onHover) => {
	return hives.map(hive => addHiveLayer(hive, onHover))
}
