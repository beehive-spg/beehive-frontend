import {
	SET_DIST,
	SET_ROUT,
	SET_DRONES,
	SET_CUSTOM_ORDERS,
} from 'constants/actionTypes'

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

export function setCustomOrders(value) {
	return {
		type: SET_CUSTOM_ORDERS,
		payload: value,
	}
}
