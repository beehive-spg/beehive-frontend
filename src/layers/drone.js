import { ScatterplotLayer } from 'deck.gl'
import along from '@turf/along'

const droneLayer = (drones, selectedRoute) => {
	const data = drones.map(drone => {
		let color = drone.color
		let radius = drone.radius

		if (
			selectedRoute &&
			selectedRoute.hops.find(hop => hop.id === drone.id)
		) {
			color = [137, 108, 184]
			radius = 45
		}

		let position = along(drone.route, drone.distance, { units: 'meters' })
		position = position.geometry.coordinates.map(coordinate =>
			coordinate.toFixed(5),
		)

		return {
			position,
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
