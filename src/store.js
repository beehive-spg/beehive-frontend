import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import client from './client'
import drone from 'redux/reducers/droneReducer'
import info from 'redux/reducers/infoReducer'

const store = createStore(
	combineReducers({
		apollo: client.reducer(),
		drone,
		info,
	}),
	{},
	compose(
		applyMiddleware(client.middleware(), thunk),
		typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: f => f,
	),
)

export default store
