import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import client from './client'

const store = createStore(
	combineReducers({
		apollo: client.reducer(),
	}),
	{},
	compose(
		applyMiddleware(client.middleware()),
		typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: f => f,
	),
)

export default store
