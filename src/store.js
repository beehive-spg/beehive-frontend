import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import drone from 'redux/reducers/droneReducer'
import hive from 'redux/reducers/hiveReducer'
import info from 'redux/reducers/infoReducer'

const store = createStore(
	combineReducers({
		drone,
		hive,
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
