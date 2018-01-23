import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { addDrones } from 'mapbox/creators/drones'
import { addHives } from 'mapbox/creators/hives'

import { newDronesAction, removeDroneAction } from 'actions/droneActions'
import { newHivesAction, removeHiveAction } from 'actions/hiveActions'

import allHivesDrones from 'graphql/queries/all_hives_drones.gql'
import droneAdded from 'graphql/subscriptions/drone_added.gql'
import droneRemoved from 'graphql/subscriptions/drone_removed.gql'
import hiveAdded from 'graphql/subscriptions/hive_added.gql'
import hiveRemoved from 'graphql/subscriptions/hive_removed.gql'

import Map from 'components/map/map'
import Sidebar from 'components/sidebar/sidebar'
import OrderInput from 'components/orderInput/orderInput'
import Error from 'components/error/error'

@connect(store => {
	return {
		drones: store.drone.drones,
		hives: store.hive.hives,
	}
})
@graphql(allHivesDrones)
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
		this.props.data.subscribeToMore({
			document: droneAdded,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev
				}
				const drone = subscriptionData.data.droneAdded
				const drones = addDrones([drone])
				this.props.dispatch(newDronesAction(drones, this.props.drones))
			},
		})

		this.props.data.subscribeToMore({
			document: droneRemoved,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev
				}
				const drone = subscriptionData.data.droneRemoved
				this.props.dispatch(removeDroneAction(drone))
			},
		})

		this.props.data.subscribeToMore({
			document: hiveAdded,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev
				}
				const hive = subscriptionData.data.hiveAdded
				const hives = addHives([hive])
				this.props.dispatch(newHivesAction(hives, this.props.hives))
			},
		})

		this.props.data.subscribeToMore({
			document: hiveRemoved,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev
				}
				const hive = subscriptionData.data.hiveRemoved
				this.props.dispatch(removeHiveAction(hive))
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
			const drones = addDrones(data.drones)
			const hives = addHives(data.hives)
			this.props.dispatch(newDronesAction(drones, this.props.drones))
			this.props.dispatch(newHivesAction(hives, this.props.hives))
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
