import { ScatterplotLayer } from 'deck.gl'

const droneLayer = (drones, selectedRoute) => {
	const data = drones.map(drone => {
		let color = drone.color
		let radius = drone.radius

		if (
			selectedRoute &&
			selectedRoute.hops.find(hop => hop.id === drone.id)
		) {
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
export { droneLayer, layer }
