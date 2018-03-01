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
		orders: store.order.orders,
		sidebarInfo: store.info.sidebarInfo,
	}
})
export default class MapLayers extends React.Component {
	constructor(props) {
		super(props)
		this.isAnimating = false

		this.drones = this.props.droneActionItem.drones
		this.state = {
			hoverInfos: {
				item: null,
			},
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
			let { drones } = this
			const { droneActionItem } = nextProps
			let droneItems = droneActionItem.drones

			switch (droneActionItem.action) {
				case 'add':
				//eslint-disable-no-fallthrough
				case 'update': {
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
		setInterval(() => {
			const time = format(addHours(Date.now(), 1), 'x')
			this.setState({ time })
		}, 1000)
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
		const { hives, shops, customers } = this.state
		const { selectedRoute, viewport } = this.props
		const { drones } = this

		const showAll = this.props.sidebarInfo === 'all' ? true : false
		return [
			layers.hive(hives, this.onHover, this.onClick),
			layers.drone(drones, selectedRoute),
			layers.shop(shops, this.onHover, viewport.zoom),
			layers.customer(customers, this.onHover, viewport.zoom),
			layers.route.distLayer(this.extractDistRoutes(), showAll),
			layers.route.genOrderLayer(this.extractGenOrders(), showAll),
			layers.route.userOrderLayer(this.extractUserOrders()),
		]
	}

	extractDistRoutes = () => {
		const { routes } = this.props

		return routes.filter(route => route.origin === 'distribution')
	}

	extractGenOrders = () => {
		const { routes, orders } = this.props
		const orderRoutes = routes.filter(route => route.origin === 'order')
		const genOrders = orders.filter(order => order.source === 'generated')

		return orderRoutes.filter(order =>
			genOrders.some(gen => gen.route === order.id),
		)
	}

	extractUserOrders = () => {
		const { routes, orders } = this.props
		const orderRoutes = routes.filter(route => route.origin === 'order')
		const genOrders = orders.filter(order => order.source === 'gui')

		return orderRoutes.filter(order =>
			genOrders.some(gen => gen.route === order.id),
		)
	}

	animate() {
		this.isAnimating = true

		const animationInterval = setInterval(() => {
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
				clearInterval(animationInterval)
			}
		}, 1000)
	}

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
