import { ADD_DRONE } from 'constants/actionTypes'

export default function reducer(state = [], action) {
	switch (action.type) {
		case ADD_DRONE:
			return state
		default:
			return state
	}
}
