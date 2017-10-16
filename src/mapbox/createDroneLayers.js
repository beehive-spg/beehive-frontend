import { addDroneLayer } from './layers'

export default drones => {
	return drones.map(drone => addDroneLayer(drone))
}
