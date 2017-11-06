import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { addDrones } from 'mapbox/creators/drones'
import { addHives } from 'mapbox/creators/hives'
import {
	newDronesAction,
	removeDroneAction,
	newHivesAction,
} from 'redux/actions/infoActions'

import allHivesDrones from 'graphql/queries/all_hives_drones.gql'
import droneAdded from 'graphql/subscriptions/drone_added.gql'
import droneRemoved from 'graphql/subscriptions/drone_removed.gql'
import hiveAdded from 'graphql/subscriptions/hive_added.gql'

import MapGL from './mapgl'
import Sidebar from 'components/sidebar/sidebar'

@connect(store => {
	return {
		drones: store.info.drones,
		hives: store.info.hives,
	}
})
@graphql(allHivesDrones)
export default class Map extends React.Component {
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
	}

	render() {
		const { data } = this.props

		if (data.loading) {
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
				<MapGL />
				<Sidebar />
			</div>
		)
	}
}
