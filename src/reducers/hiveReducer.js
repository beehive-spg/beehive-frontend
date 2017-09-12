import { ADD_HIVES } from 'src/constants/actionTypes'

export default function reducer(state, action) {
	switch (action.type) {
	case ADD_HIVES: {
		const { hives } = action.payload
		return {
			...state,
			data: state.data.concat(hives),
		}
	}
	default:
		return state
	}
}
