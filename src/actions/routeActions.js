import { ADD_ROUTES, REMOVE_ROUTE } from 'constants/actionTypes'

export function newRoutesAction(routes) {
	return {
		type: ADD_ROUTES,
		payload: routes,
	}
}

export function removeRouteAction(route) {
	return {
		type: REMOVE_ROUTE,
		payload: route,
	}
}
