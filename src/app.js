import config from 'kit/config'
import Main from 'src/components/main'
import hiveReducer from 'src/reducers/hiveReducer'

config.addReducer('hives', hiveReducer, { data: [], layers: [] })

config.enableGraphQLServer()

if (SERVER) {
	config.setGraphQLSchema(require('src/graphql/schema').default)

	const winston = require('winston')

	config.set404Handler(ctx => {
		ctx.state = 404

		ctx.body = 'This route does not exist.'
	})

	config.setErrorHandler((e, ctx) => {
		winston.info('Some kind of error occured.')
		ctx.body = 'Some kind of error occured.'
	})
}

export default Main
