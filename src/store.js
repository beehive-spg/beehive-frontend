import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import drone from 'reducers/droneReducer'
import hive from 'reducers/hiveReducer'
import route from 'reducers/routeReducer'
import info from 'reducers/infoReducer'

const store = createStore(
	combineReducers({
		drone,
		hive,
		route,
		info,
	}),
	{},
	compose(
		applyMiddleware(thunk),
		typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: f => f,
	),
)

export default store
