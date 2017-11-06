import React from 'react'
import DeckGL from 'deck.gl'
import { connect } from 'react-redux'

import { createDroneLayers, createHiveLayers } from 'mapbox/layers'

import './layers.css'

@connect(store => {
	return {
		droneActionItem: store.info.droneActionItem,
		hiveActionItem: store.info.hiveActionItem,
	}
})
export default class MapLayers extends React.Component {
	constructor(props) {
		super(props)
		this.isAnimating = false

		const droneItems = this.addCounter(this.props.droneActionItem.drones)

		this.state = {
			hoveredItem: null,
			drones: droneItems,
			hives: this.props.hiveActionItem.hives,
		}
	}

	componentDidMount() {
		this.animate()
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.droneActionItem !== nextProps.droneActionItem) {
			let { drones } = this.state
			const { droneActionItem } = nextProps
			let droneItems = droneActionItem.drones

			switch (droneActionItem.action) {
				case 'add':
				//eslint-disable-no-fallthrough
				case 'update': {
					droneItems = this.addCounter(droneItems)

					const index = drones.findIndex(
						res => res.id === droneItems[0].id,
					)
					if (index === -1) {
						drones = [...drones, ...droneItems]
					} else {
						drones[index] = droneItems[0]
					}
					break
				}
				case 'remove': {
					drones = drones.filter(res => res.id !== droneItems)
				}
			}

			this.setState({
				drones,
			})

			if (!this.isAnimating) {
				this.animate()
			}
		}

		if (this.props.hiveActionItem !== nextProps.hiveActionItem) {
			let { hives } = this.state
			const { hiveActionItem } = nextProps
			const hiveItems = hiveActionItem.hives

			switch (hiveActionItem.action) {
				case 'add':
				//eslint-disable-no-fallthrough
				case 'update': {
					const index = hives.findIndex(
						res => res.id === hiveItems[0].id,
					)
					if (index === -1) {
						hives = [...hives, ...hiveItems]
					} else {
						hives[index] = hiveItems[0]
					}

					break
				}
			}

			this.setState({
				hives,
			})
		}
	}

	addCounter(drones) {
		return drones.map(drone => {
			return {
				...drone,
				counter: 0,
			}
		})
	}

	onHover = ({ x, y, layer, picked }) => {
		const { hives } = this.state

		const layerName = layer.id
		const layerParts = layerName.split('-')
		const hive = hives.find(h => h.id === layerParts[2])
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
		const { hives, drones } = this.state
		return [
			...createHiveLayers(hives, this.onHover),
			createDroneLayers(drones),
		]
	}

	animate() {
		this.isAnimating = true

		let { drones } = this.state

		for (let drone of drones) {
			if (drone.counter !== drone.route.length - 1) {
				drone.counter++
			} else {
				drones = drones.filter(res => res.id !== drone.id)
			}
		}

		this.setState({
			drones,
		})

		if (drones.length === 0) {
			this.isAnimating = false
			return
		}

		requestAnimationFrame(this.animate.bind(this))
	}

	render() {
		const { viewport } = this.props

		return (
			<div>
				<DeckGL {...viewport} layers={this.createLayers()} />
				{this.renderHiveInfo()}
			</div>
		)
	}
}
