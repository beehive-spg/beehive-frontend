import { ADD_HIVES, REMOVE_HIVE } from 'constants/actionTypes'

export function newHivesAction(hives) {
	return dispatch => {
		dispatch({
			type: ADD_HIVES,
			payload: hives,
		})
	}
}

export function removeHiveAction(hive) {
	return {
		type: REMOVE_HIVE,
		payload: hive,
	}
}
