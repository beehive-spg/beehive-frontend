import { ADD_ROUTES, REMOVE_ROUTE } from 'constants/actionTypes'

export default function reducer(
	state = {
		routes: [],
	},
	action,
) {
	switch (action.type) {
		case ADD_ROUTES:
			return {
				...state,
				routes: [...state.routes, ...action.payload],
			}
		case REMOVE_ROUTE: {
			const id = action.payload
			const newRoutes = state.routes.filter(route => route.id !== id)

			return {
				...state,
				routes: newRoutes,
			}
		}
		default:
			return state
	}
}
