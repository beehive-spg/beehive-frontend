import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import models from 'models'

import Map from 'components/map/map'
import Sidebar from 'components/sidebar/sidebar'
import OrderInput from 'components/orderInput/orderInput'
import Error from 'components/error/error'

import { hives_shops } from 'graphql/queries'

import { handleDeparture } from 'utils/flight'

import { departure } from 'graphql/subscriptions'

@connect(store => {
	return {
		hives: store.hive.hives,
		shops: store.shop.shops,
	}
})
@graphql(hives_shops)
export default class Main extends React.Component {
	constructor(props) {
		super(props)

		this.firstLoad = true
	}

	shouldComponentUpdate(nextProps) {
		if (
			nextProps.shops !== this.props.shops ||
			nextProps.hives !== this.props.hives
		) {
			return false
		}

		return true
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
		return (
			<div>
				<Map hiveModels={hives} shopModels={shops} />
				<Sidebar />
				<OrderInput />
			</div>
		)
	}
}
