import { ScatterplotLayer } from 'deck.gl'

const addDroneLayer = drone => {
	return new ScatterplotLayer({
		id: `layer-drone-${drone.id}`,
		data: drone.data,
		outline: false,
	})
}

export default addDroneLayer
