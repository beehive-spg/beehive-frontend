import { addHives } from 'mapbox/creators/hives'

const updateOrAddToStore = (hive, apolloStore, localState) => {
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
	} else {
		newLocalState.push(hiveData)
	}

	return { newApolloStore, newLocalState }
}

export { updateOrAddToStore }
