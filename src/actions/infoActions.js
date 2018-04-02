import {
	CHANGE_SIDEBAR_INFO,
	SELECT_ROUTE,
	SELECT_HIVE,
} from 'constants/actionTypes'

export function changeInfo(info) {
	if (info === 'all') {
		info = 'user'
	} else {
		info = 'all'
	}
	return {
		type: CHANGE_SIDEBAR_INFO,
		payload: info,
	}
}

export function selectRoute(route) {
	return {
		type: SELECT_ROUTE,
		payload: route,
	}
}

export function selectHive(hive) {
	return {
		type: SELECT_HIVE,
		payload: hive,
	}
}
