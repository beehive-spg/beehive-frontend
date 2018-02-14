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

const httpLink = new HttpLink({
	uri: 'http://localhost:8080/graphql',
})

const wsLink = new WebSocketLink({
	uri: 'ws://localhost:8080/subscriptions',
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
