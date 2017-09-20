import { ScatterplotLayer } from 'deck.gl'

const addDroneLayer = drone => {
	const { stops } = drone.route
	// temporary
	const stop = stops[0]
	const data = [
		{
			position: [stop.longitude, stop.latitude],
			radius: 5,
			color: [36, 184, 41],
		},
	]

	return new ScatterplotLayer({
		id: `layer-drone-${drone.id}`,
		data,
		outline: false,
	})
}

export default addDroneLayer
