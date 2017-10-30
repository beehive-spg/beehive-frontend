import React from 'react'
import DeckGL from 'deck.gl'
import { graphql } from 'react-apollo'

import { addDrones } from 'mapbox/creators/drones'
import { addHives } from 'mapbox/creators/hives'
import { createDroneLayers, createHiveLayers } from 'mapbox/layers'

import allHivesDrones from 'graphql/queries/all_hives_drones.gql'
import hiveAdded from 'graphql/subscriptions/hive_added.gql'
import droneAdded from 'graphql/subscriptions/drone_added.gql'

import {
	removeDroneFromStore,
	updateOrAddToStore,
} from 'graphql/local/droneUpdates'

import './layers.css'

@graphql(allHivesDrones)
export default class MapLayers extends React.Component {
	constructor(props) {
		super(props)
		this.firstFetch = true
		this.isAnimating = false

		this.state = {
			hoveredItem: null,
			hiveData: [],
			droneData: [],
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
				const hive = addHives([newHive])
				this.setState({
					hiveData: [...this.state.hiveData, hive[0]],
				})
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
				const drone = subscriptionData.data.droneAdded

				const newData = updateOrAddToStore(
					drone,
					prev.drones,
					this.state.droneData,
				)

				this.setState({
					droneData: newData.newLocalState,
				})

				if (!this.isAnimating) {
					this.animate()
				}

				return {
					...prev,
					drones: newData.newApolloStore,
				}
			},
		})
	}

	onHover = ({ x, y, layer, picked }) => {
		const { hiveData } = this.state

		const layerName = layer.id
		const layerParts = layerName.split('-')
		const hive = hiveData.find(h => h.id === layerParts[2])
		this.setState({
			hoveredItem: hive,
			x,
			y,
			picked,
		})
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

	createLayers() {
		const { hiveData, droneData } = this.state

		return [
			...createHiveLayers(hiveData, this.onHover),
			...createDroneLayers(droneData),
		]
	}

	animate() {
		this.isAnimating = true

		const { droneData } = this.state
		let newDroneData = droneData

		for (let drone of newDroneData) {
			const { position } = drone.data[0]
			const { coordinates } = drone.route[drone.route.length - 1].geometry
			if (position !== coordinates) {
				if (typeof drone.route[drone.counter] === 'undefined') {
					return
				}
				let newData = [{ ...drone.data[0] }]
				const { coordinates } = drone.route[drone.counter].geometry
				newData[0].position = coordinates
				drone.data = newData
				drone.counter++

				const index = newDroneData.findIndex(res => res.id === drone.id)
				newDroneData[index] = drone
			} else {
				newDroneData = newDroneData.filter(res => res.id !== drone.id)
				removeDroneFromStore(drone)
			}
		}

		this.setState({
			droneData: newDroneData,
		})

		if (newDroneData.length === 0) {
			this.isAnimating = false
			return
		}
		requestAnimationFrame(this.animate.bind(this))
	}

	render() {
		const { viewport, data } = this.props
		if (data.loading) {
			return <div>loading...</div>
		} else if (this.firstFetch) {
			this.setState({
				hiveData: addHives(data.hives),
				droneData: addDrones(data.drones),
			})
			this.firstFetch = false
			this.animate()
			return
		}

		return (
			<div>
				<DeckGL {...viewport} layers={this.createLayers()} />
				{this.renderHiveInfo()}
			</div>
		)
	}
}
