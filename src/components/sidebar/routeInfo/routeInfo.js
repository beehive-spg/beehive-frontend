import React from 'react'
import { connect } from 'react-redux'

import { selectRoute } from 'actions/infoActions'

import Route from './route/route'

@connect(store => {
	return {
		routes: store.route.routes,
		selectedRoute: store.info.selectedRoute,
	}
})
export default class RouteInfo extends React.Component {
	onClick = route => {
		const { selectedRoute } = this.props
		if (route === selectedRoute) {
			route = null
		}

		this.props.dispatch(selectRoute(route))
	}

	render() {
		const { routes } = this.props
		const routeObjects = routes.map((route, key) => {
			let selected = false
			if (route.id === this.props.selectedRoute) {
				selected = true
			}

			return (
				<Route
					key={key}
					route={route}
					onClick={this.onClick}
					selected={selected}
				/>
			)
		})

		return <div>{routeObjects}</div>
	}
}
