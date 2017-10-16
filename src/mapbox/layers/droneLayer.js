import { ScatterplotLayer } from 'deck.gl'

const addDroneLayer = drone => {
	const added = new ScatterplotLayer({
		id: `layer-drone-${drone.id}`,
		data: drone.data,
		outline: false,
	})
	return added
}

export default addDroneLayer
