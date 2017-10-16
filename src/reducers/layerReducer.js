import { ADD_DRONE, ADD_DRONES } from 'constants/actionTypes'

export default function reducer(state = [], action) {
	switch (action.type) {
		case ADD_DRONE:
			return [...state, action.payload.droneLayer]
		case ADD_DRONES:
			return [...state, ...action.payload.droneLayers]
		default:
			return state
	}
}
