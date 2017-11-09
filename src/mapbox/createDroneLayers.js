import { addDroneLayer } from './layers'

export default (drones, selectedDrone) => {
	const data = drones.map(drone => {
		let color = drone.color
		let radius = drone.radius
		if (drone.id === selectedDrone) {
			color = [16, 150, 18]
			radius = 50
		}

		return {
			position: drone.route[drone.counter].geometry.coordinates,
			radius,
			color,
		}
	})
	return addDroneLayer(data)
}
