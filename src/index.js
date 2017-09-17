import React from 'react'
import ReactDOM from 'react-dom'
import {
	ApolloClient,
	ApolloProvider,
	createNetworkInterface,
} from 'react-apollo'
import './index.css'
import Main from './components/main'
import registerServiceWorker from './registerServiceWorker'

const networkInterface = createNetworkInterface({
	uri: 'http://localhost:8080/graphql',
})

const client = new ApolloClient({
	networkInterface,
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<Main />
	</ApolloProvider>,
	document.getElementById('root'),
)
registerServiceWorker()
