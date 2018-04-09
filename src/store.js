import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import drone from 'reducers/droneReducer'
import hive from 'reducers/hiveReducer'
import shop from 'reducers/shopReducer'
import customer from 'reducers/customerReducer'
import order from 'reducers/orderReducer'
import route from 'reducers/routeReducer'
import info from 'reducers/infoReducer'
import settings from 'reducers/settingsReducer'

const store = createStore(
	combineReducers({
		drone,
		hive,
		shop,
		customer,
		order,
		route,
		info,
		settings,
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
