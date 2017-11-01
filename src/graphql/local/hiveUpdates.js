import { addHives } from 'mapbox/creators/hives'

import { addHiveInfo, updateHiveInfo } from 'redux/actions/infoActions'

const updateOrAddToStore = (hive, apolloStore, localState, dispatch) => {
	const apolloIndex = apolloStore.findIndex(res => res.id === hive.id)
	const stateIndex = localState.findIndex(res => res.id === hive.id)

	const hiveData = addHives([hive])[0]

	const newApolloStore = [...apolloStore]
	const newLocalState = [...localState]

	if (apolloIndex !== -1) {
		newApolloStore[apolloIndex] = hive
	} else {
		newApolloStore.push(hive)
	}

	if (stateIndex !== -1) {
		newLocalState[stateIndex] = hiveData
		dispatch(updateHiveInfo(hive))
	} else {
		newLocalState.push(hiveData)
		dispatch(addHiveInfo([hive]))
	}

	return { newApolloStore, newLocalState }
}

export { updateOrAddToStore }
