import React from 'react'
import { connect } from 'react-redux'
import Switch from 'rc-switch'

import { changeInfo, selectRoute } from 'actions/infoActions'

import Route from './route/route'

import './routeInfo.css'
import 'rc-switch/assets/index.css'

@connect(store => {
	return {
		routes: store.route.routes,
		orders: store.order.orders,
		selectedRoute: store.info.selectedRoute,
		sidebarInfo: store.info.sidebarInfo,
	}
})
export default class RouteInfo extends React.Component {
	constructor(props) {
		super(props)
	}

	onClick = route => {
		const { selectedRoute } = this.props
		let clicked = this.props.routes.find(r => r.id === route)
		if (clicked === selectedRoute) {
			clicked = null
		}

		this.props.dispatch(selectRoute(clicked))
	}

	onChange = () => {
		this.props.dispatch(changeInfo(this.props.sidebarInfo))
	}

	createRoutes = () => {
		if (this.props.sidebarInfo === 'all') {
			const { routes, selectedRoute } = this.props
			const routeObjects = routes
				.filter(route => route.origin === 'distribution')
				.map(route => {
					const from = route.hops[0].start.type[0].name
					const to =
						route.hops[route.hops.length - 1].end.type[0].name
					let selected = false
					if (selectedRoute && route.id === selectedRoute.id)
						selected = true

					return (
						<Route
							key={route.id}
							route={route.id}
							from={from}
							to={to}
							onClick={this.onClick}
							selected={selected}
						/>
					)
				})

			const orderObjects = this.createOrderObjects()
			return [...routeObjects, ...orderObjects]
		} else {
			return this.createOrderObjects()
		}
	}

	createOrderObjects = () => {
		const { orders, selectedRoute } = this.props

		return orders.filter(order => order.source === 'gui').map(order => {
			const from = order.shop.type[0].name
			const to = order.customer.location.address
			let selected = false
			if (selectedRoute && order.route === selectedRoute.id)
				selected = true
			return (
				<Route
					key={order.id}
					route={order.route}
					from={from}
					to={to}
					onClick={this.onClick}
					selected={selected}
				/>
			)
		})
	}

	render() {
		return (
			<div>
				<div className="routes">{this.createRoutes()}</div>
				<div className="switcher">
					All routes
					<Switch
						className="switch"
						onChange={this.onChange.bind(this)}
						checkedChildren={'A'}
						unCheckedChildren={'U'}
					/>
					User orders
				</div>
			</div>
		)
	}
}
