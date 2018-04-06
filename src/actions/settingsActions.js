import { SET_DIST, SET_ROUT, SET_DRONES } from 'constants/actionTypes'

export function setDistribution(value) {
	return {
		type: SET_DIST,
		payload: value,
	}
}

export function setRouting(value) {
	return {
		type: SET_ROUT,
		payload: value,
	}
}

export function setDrones(value) {
	return {
		type: SET_DRONES,
		payload: value,
	}
}
