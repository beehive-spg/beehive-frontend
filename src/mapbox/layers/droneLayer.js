import { ScatterplotLayer } from 'deck.gl'

const addDroneLayer = drone => {
	const { coordinates } = drone
	const data = [
		{
			position: [coordinates.longitude, coordinates.latitude],
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
