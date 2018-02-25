import React from 'react'
import DeckGL from 'deck.gl'
import { connect } from 'react-redux'

import layers from 'layers'
import { selectHive } from 'actions/infoActions'
import { handleArrival } from 'utils/flight'

import { format, addHours, differenceInSeconds } from 'date-fns'

import InfoOverlay from './infoOverlay'

@connect(store => {
	return {
		droneActionItem: store.drone.droneActionItem,
		hiveActionItem: store.hive.hiveActionItem,
		shopActionItem: store.shop.shopActionItem,
		customerActionItem: store.customer.customerActionItem,
		selectedRoute: store.info.selectedRoute,
		routes: store.route.routes,
	}
})
export default class MapLayers extends React.Component {
	constructor(props) {
		super(props)
		this.isAnimating = false

		const droneItems = this.addCounter(this.props.droneActionItem.drones)

		this.drones = this.props.droneActionItem.drones
		this.state = {
			hoverInfos: {
				item: null,
			},
			drones: droneItems,
			hives: this.props.hiveActionItem.hives,
			shops: this.props.shopActionItem.shops,
			customers: this.props.customerActionItem.customers,
		}
	}

	componentDidMount() {
		this.setTime()
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
					// droneItems = this.addCounter(droneItems)

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
				case 'remove':
					drones = drones.filter(res => res.id !== droneItems)
			}

			this.drones = drones
			if (!this.isAnimating) this.animate()
			// this.setState(
			// {
			// drones,
			// },
			// () => {
			// if (!this.isAnimating) {
			// this.animate()
			// }
			// },
			// )
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
				case 'remove':
					hives = hives.filter(res => res.id !== hiveItems)
			}

			this.setState({
				hives,
			})
		}

		if (this.props.shopActionItem !== nextProps.shopActionItem) {
			let { shops } = this.state
			const { shopActionItem } = nextProps
			const shopItems = shopActionItem.shops

			switch (shopActionItem.action) {
				case 'add':
				//eslint-disable-no-fallthrough
				case 'update': {
					const index = shops.findIndex(
						res => res.id === shopItems[0].id,
					)
					if (index === -1) {
						shops = [...shops, ...shopItems]
					} else {
						shops[index] = shopItems[0]
					}
					break
				}
				case 'remove':
					shops = shops.filter(res => res.id !== shopItems)
			}

			this.setState({
				shops,
			})
		}

		if (this.props.customerActionItem !== nextProps.customerActionItem) {
			let { customers } = this.state
			const { customerActionItem } = nextProps
			const customerItems = customerActionItem.customers

			switch (customerActionItem.action) {
				case 'add':
				//eslint-disable-no-fallthrough
				case 'update': {
					const index = customers.findIndex(
						res => res.id === customerItems[0].id,
					)
					if (index === -1) {
						customers = [...customers, ...customerItems]
					} else {
						customers[index] = customerItems[0]
					}
					break
				}
				case 'remove':
					customers = customers.filter(
						res => res.id !== customerItems,
					)
			}

			this.setState({
				customers,
			})
		}
	}

	setTime() {
		const time = format(addHours(Date.now(), 1), 'x')
		this.setState({ time })
		requestAnimationFrame(this.setTime.bind(this))
	}

	addCounter(drones) {
		return drones.map(drone => {
			return {
				...drone,
				counter: 0,
			}
		})
	}

	onHover = ({ index, picked, x, y, layer }) => {
		this.setState({
			hoverInfos: {
				layer: layer.id,
				index,
				picked,
				x: x + 20,
				y: y - 20,
			},
		})
	}

	onClick = ({ index }) => {
		this.props.dispatch(selectHive(this.state.hives[index]))
	}

	createLayers() {
		const { hives, /* drones,*/ shops, customers } = this.state
		const { selectedRoute, viewport, routes } = this.props
		const { drones } = this

		return [
			layers.hive(hives, this.onHover, this.onClick),
			// layers.drone(drones, selectedRoute),
			layers.drone(drones, selectedRoute),
			layers.shop(shops, this.onHover, viewport.zoom),
			layers.customer(customers, this.onHover, viewport.zoom),
			layers.route(routes),
		]
	}

	animate() {
		this.isAnimating = true

		let { drones } = this

		for (let drone of drones) {
			const { time } = this.state
			if (time > drone.enddate) {
				drones = drones.filter(d => d.id !== drone.id)
				handleArrival(drone.id)
			} else {
				let timespan = differenceInSeconds(
					new Date(+time),
					new Date(+drone.startdate),
				)
				if (timespan < +0) timespan = 0
				const distance = drone.speed * timespan
				drone.distance = distance
			}
		}

		this.drones = drones

		if (drones.length === 0) {
			this.isAnimating = false
			return
		}

		requestAnimationFrame(this.animate.bind(this))
	}
	// animate() {
	// this.isAnimating = true

	// let { drones } = this.state

	// for (let drone of drones) {
	// if (drone.counter !== drone.route.length - 1) {
	// drone.counter++
	// } else {
	// drones = drones.filter(item => item.id !== drone.id)
	// handleArrival(drone.id)
	// }
	// }

	// this.setState({
	// drones,
	// })

	// if (drones.length === 0) {
	// this.isAnimating = false
	// return
	// }

	// requestAnimationFrame(this.animate.bind(this))
	// }

	render() {
		const { viewport } = this.props
		const { hives, shops, customers, hoverInfos } = this.state

		return (
			<div>
				<DeckGL {...viewport} layers={this.createLayers()} />
				<InfoOverlay
					infos={hoverInfos}
					hives={hives}
					shops={shops}
					customers={customers}
				/>
			</div>
		)
	}
}
