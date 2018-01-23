import { ScatterplotLayer } from 'deck.gl'

const droneLayer = (drones, selectedDrone) => {
	const data = drones.map(drone => {
		let color = drone.color
		let radius = drone.radius
		if (drone.id === selectedDrone) {
			color = [16, 150, 18]
			radius = 50
		}

		return {
			position: drone.route[drone.counter],
			radius,
			color,
		}
	})
	return layer(data)
}

const layer = data => {
	return new ScatterplotLayer({
		id: 'layer-drone',
		data,
		outline: false,
	})
}

export default droneLayer
