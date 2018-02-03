import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import models from 'models'

import { newHivesAction } from 'actions/hiveActions'

import Map from 'components/map/map'
import Sidebar from 'components/sidebar/sidebar'
import OrderInput from 'components/orderInput/orderInput'
import Error from 'components/error/error'

import { hives } from 'graphql/queries'

import { handleDeparture } from 'utils/flight'
import { departure } from 'graphql/subscriptions'

@connect(store => {
	return {
		drones: store.drone.drones,
		hives: store.hive.hives,
		routes: store.route.routes,
	}
})
@graphql(hives)
export default class Main extends React.Component {
	constructor(props) {
		super(props)

		this.firstLoad = true
	}

	shouldComponentUpdate(nextProps) {
		if (
			nextProps.drones !== this.props.drones ||
			nextProps.hives !== this.props.hives
		) {
			return false
		}
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
				handleDeparture(
					this.props.routes,
					this.props.drones,
					flight,
					this.props.dispatch,
				)
			},
		})
	}

	render() {
		const { data } = this.props

		if (data.error) {
			return <Error />
		} else if (data.loading) {
			return null
		} else if (this.firstLoad) {
			const hives = models.hive(data.hives)
			this.props.dispatch(newHivesAction(hives))
			this.firstLoad = false
		}

		return (
			<div>
				<Map />
				<Sidebar />
				<OrderInput />
			</div>
		)
	}
}
