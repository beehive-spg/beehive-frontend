import { ADD_SHOPS, REMOVE_SHOP } from 'constants/actionTypes'

export default function reducer(
	state = {
		shops: [],
		shopActionItem: {
			action: '',
			shops: [],
		},
	},
	action,
) {
	switch (action.type) {
		case ADD_SHOPS:
			return {
				...state,
				shopActionItem: {
					action: 'add',
					shops: action.payload,
				},
				shops: [...state.shops, ...action.payload],
			}
		case REMOVE_SHOP: {
			const id = action.payload
			const newShops = state.shops.filter(res => res.id !== id)

			return {
				...state,
				shopActionItem: {
					action: 'remove',
					shops: id,
				},
				shops: newShops,
			}
		}
		default:
			return state
	}
}
