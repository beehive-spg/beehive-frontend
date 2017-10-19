import React from 'react'
import DeckGL from 'deck.gl'
import { graphql } from 'react-apollo'

import { addDrones } from 'mapbox/creators/drones'
import { createDroneLayers, createHiveLayers } from 'mapbox/layers'

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
				const drone = addDrones([newDrone])
				this.setState({
					droneData: [...this.state.droneData, drone[0]],
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
		const { data } = this.props
		const { droneData } = this.state

		return [
			...createHiveLayers(data.hives, this.onHover),
			...createDroneLayers(droneData),
		]
	}

	animate() {
		let { droneData } = this.state
		let newDroneData = droneData

		droneData.forEach(drone => {
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

				const index = droneData.findIndex(res => res.id === drone.id)
				droneData[index] = drone
				this.setState({
					droneData,
				})
			} else {
				newDroneData = droneData.filter(res => res.id !== drone.id)
			}
		})

		if (droneData !== newDroneData) {
			this.setState({
				droneData: newDroneData,
			})
		}

		if (this.state.droneData.length === 0) {
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
