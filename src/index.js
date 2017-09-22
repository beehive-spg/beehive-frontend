import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import dotenv from 'dotenv'
import Main from './components/main'
import './index.css'
import client from './client'
import registerServiceWorker from './registerServiceWorker'

dotenv.config()

/* eslint-disable */
if (module.hot) {
	require('preact/devtools')
}
/* eslint-enable */

ReactDOM.render(
	<ApolloProvider client={client}>
		<Main />
	</ApolloProvider>,
	document.getElementById('root'),
)
registerServiceWorker()
