import { ApolloClient, createNetworkInterface } from 'react-apollo'
import {
	SubscriptionClient,
	addGraphQLSubscriptions,
} from 'subscriptions-transport-ws'

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

export default client
