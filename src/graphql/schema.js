import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
	type Coordinates {
		longitude: Float!,
		latitude: Float!
	}

	input CoordinatesInput {
		longitude: Float!,
		latitude: Float!
	}

	type Hive {
		id: ID!,
		location: String,
		coordinates: Coordinates
	}

	input HiveInput {
		id: ID!,
		location: String,
		coordinates: CoordinatesInput
	}

	type Query {
		hives: [Hive]
		hive(id: ID!): Hive
	}

	type Mutation {
		addHive(
			hive: HiveInput!
		): Hive
		updateHive(
			id: ID!
			location: String
		): Hive
	}
`

const schema = makeExecutableSchema({ typeDefs, resolvers })
export default schema
