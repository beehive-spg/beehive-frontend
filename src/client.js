import { ApolloClient } from 'apollo-client'
import {
	InMemoryCache,
	IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import introspectionQueryResultData from './fragmentTypes.json'

const backendUrl = process.env.REACT_APP_BACKEND_URL //eslint-disable-line

const httpLink = new HttpLink({
	uri: `http://${backendUrl}/graphql`,
})

const wsLink = new WebSocketLink({
	uri: `ws://${backendUrl}/subscriptions`,
	options: { reconnect: true },
})

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink,
)

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData,
})

const cache = new InMemoryCache({ fragmentMatcher })

const client = new ApolloClient({
	link,
	cache,
})

export default client
