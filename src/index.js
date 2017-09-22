import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import dotenv from 'dotenv'
import Main from './components/main'
import client from './client'
import store from './store'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

dotenv.config()

/* eslint-disable */
if (module.hot) {
	require('preact/devtools')
}
/* eslint-enable */

ReactDOM.render(
	<ApolloProvider store={store} client={client}>
		<Main />
	</ApolloProvider>,
	document.getElementById('root'),
)
registerServiceWorker()
