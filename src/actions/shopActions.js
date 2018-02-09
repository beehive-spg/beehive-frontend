import { ADD_SHOPS, REMOVE_SHOP } from 'constants/actionTypes'

export function newShopsAction(shops) {
	return dispatch => {
		dispatch({
			type: ADD_SHOPS,
			payload: shops,
		})
	}
}

export function removeShopAction(shop) {
	return {
		type: REMOVE_SHOP,
		payload: shop,
	}
}
