import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import dotenv from 'dotenv'
import Main from './components/main'
import client from './client'
import store from './store'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import registerServiceWorker from './registerServiceWorker'

dotenv.config()

/* eslint-disable */
if (module.hot) {
	require('preact/devtools')
}
/* eslint-enable */

const Wrapped = (
	<Provider store={store}>
		<ApolloProvider client={client}>
			<Main />
		</ApolloProvider>
	</Provider>
)

render(Wrapped, document.getElementById('root'))
registerServiceWorker()
