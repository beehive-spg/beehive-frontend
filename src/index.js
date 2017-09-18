import React from 'react'
import ReactDOM from 'react-dom'
import {
	ApolloClient,
	ApolloProvider,
	createNetworkInterface,
} from 'react-apollo'
import {
	SubscriptionClient,
	addGraphQLSubscriptions,
} from 'subscriptions-transport-ws'
import './index.css'
import Main from './components/main'
import registerServiceWorker from './registerServiceWorker'

const wsClient = new SubscriptionClient('ws://localhost:8080/subscriptions', {
	reconnect: true,
})

const networkInterface = createNetworkInterface({
	uri: 'http://localhost:8080/graphql',
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
	networkInterface,
	wsClient,
)

const client = new ApolloClient({
	networkInterface: networkInterfaceWithSubscriptions,
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<Main />
	</ApolloProvider>,
	document.getElementById('root'),
)
registerServiceWorker()
