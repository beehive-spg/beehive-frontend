import { addDroneLayer } from './layers'

export default drones => {
	const layers = []
	drones.forEach(drone => {
		layers.push(addDroneLayer(drone))
	})
	return layers
}
