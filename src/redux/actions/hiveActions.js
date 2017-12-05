import { ADD_HIVES, UPDATE_HIVE, REMOVE_HIVE } from 'constants/actionTypes'

export function newHivesAction(hives, hiveStore) {
	return dispatch => {
		if (hives.length === 1) {
			const index = hiveStore.findIndex(res => res.id === hives[0].id)
			if (index !== -1) {
				dispatch({
					type: UPDATE_HIVE,
					payload: {
						index,
						hive: hives,
					},
				})
				return
			}
		}

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
