import { ScatterplotLayer } from 'deck.gl'

const addDroneLayer = data => {
	return new ScatterplotLayer({
		id: 'layer-drone',
		data,
		outline: false,
	})
}

export default addDroneLayer
