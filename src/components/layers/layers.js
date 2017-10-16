import React from 'react'
import DeckGL from 'deck.gl'
import { graphql } from 'react-apollo'

import createHiveLayers from 'mapbox/createHiveLayers'
import createDroneLayers from 'mapbox/createDroneLayers'

import { addDrone, addDrones } from 'mapbox/creators/drones'

import allHivesDrones from 'graphql/queries/all_hives_drones.gql'
import hiveAdded from 'graphql/subscriptions/hive_added.gql'
import droneAdded from 'graphql/subscriptions/drone_added.gql'

import './layers.css'

@graphql(allHivesDrones)
export default class MapLayers extends React.Component {
	constructor(props) {
		super(props)

		this.firstFetch = true

		this.state = {
			hoveredItem: null,
			droneLayers: [],
		}
	}

	componentWillMount() {
		this.props.data.subscribeToMore({
			document: hiveAdded,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev
				}
				const newHive = subscriptionData.data.hiveAdded
				return {
					...prev,
					hives: [...prev.hives, newHive],
				}
			},
		})

		this.props.data.subscribeToMore({
			document: droneAdded,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev
				}
				const newDrone = subscriptionData.data.droneAdded
				this.setState({
					droneLayers: [
						...this.state.droneLayers,
						addDrone(newDrone),
					],
				})
				return {
					...prev,
					drones: [...prev.drones, newDrone],
				}
			},
		})
	}

	onHover = ({ x, y, layer, picked }) => {
		const { data } = this.props
		const layerName = layer.id
		const layerParts = layerName.split('-')
		const hive = data.hives.find(h => h.id === layerParts[2])
		this.setState({ hoveredItem: hive, x, y, picked })
	}

	addLayers() {
		const { data /*layers*/ } = this.props
		const { droneLayers } = this.state

		return [
			...createHiveLayers(data.hives, this.onHover),
			...createDroneLayers(...droneLayers),
		]
	}

	renderHiveInfo() {
		const { x, y, hoveredItem, picked } = this.state

		if (!picked) {
			return null
		}

		return (
			hoveredItem && (
				<div className="hiveInfo" style={{ top: y, left: x }}>
					<div>Location:</div>
					<p>{hoveredItem.location}</p>
				</div>
			)
		)
	}

	render() {
		const { viewport, data } = this.props
		if (data.loading) {
			return <div>loading...</div>
		} else {
			if (this.firstFetch) {
				this.setState({
					droneLayers: [
						...this.state.droneLayers,
						addDrones(data.drones),
					],
				})
				this.firstFetch = false
				return
			}
		}

		return (
			<div>
				<DeckGL {...viewport} layers={this.addLayers()} />
				{this.renderHiveInfo()}
			</div>
		)
	}
}
