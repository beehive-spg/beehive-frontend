import { addDroneLayer } from './layers'

export default drones => {
	const layers = []
	drones.map(hive => layers.push(addDroneLayer(hive)))
	return layers
}
