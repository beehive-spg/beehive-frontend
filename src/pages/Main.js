import React from 'react'
import { graphql } from 'react-apollo'

import models from 'models'

import Map from 'components/map/map'
import Sidebar from 'components/sidebar/sidebar'
import OrderInput from 'components/orderInput/orderInput'
import Settings from 'components/settings/settings'
import Error from 'components/error/error'

import { hives_shops_ongoing } from 'graphql/queries'

import { handleDepartures, handleDeparture } from 'utils/flight'

import { departure } from 'graphql/subscriptions'

@graphql(hives_shops_ongoing)
export default class Main extends React.Component {
	constructor(props) {
		super(props)

		this.firstLoad = true
	}

	componentDidMount() {
		const { data } = this.props

		data.subscribeToMore({
			document: departure,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev
				}
				const flight = subscriptionData.data.departure

				handleDeparture(flight)
			},
		})
	}

	render() {
		const { data } = this.props

		if (data.error) {
			return <Error />
		} else if (data.loading) {
			return null
		}

		const hives = models.hive(data.hives)
		const shops = models.shop(data.shops)
		handleDepartures(data.ongoingFlights)
		return (
			<div>
				<Map hiveModels={hives} shopModels={shops} />
				<Settings />
				<Sidebar />
				<OrderInput />
			</div>
		)
	}
}
