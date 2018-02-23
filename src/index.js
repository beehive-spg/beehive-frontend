import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import dotenv from 'dotenv'
//import Main from './components/main'
import App from 'pages/App'
import client from './client'
import store from './store'
import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import registerServiceWorker from './registerServiceWorker'

dotenv.config()

const Wrapped = (
	<Provider store={store}>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</Provider>
)

render(Wrapped, document.getElementById('root'))
registerServiceWorker()
