import { addDroneLayer } from './layers'

export default drones => {
	const data = drones.map(drone => {
		return {
			position: drone.route[drone.counter].geometry.coordinates,
			radius: drone.radius,
			color: drone.color,
		}
	})
	return addDroneLayer(data)
}
