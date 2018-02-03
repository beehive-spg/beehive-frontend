import React from 'react'

import './route.css'

export default class Route extends React.Component {
	render() {
		const { route, onClick, selected } = this.props
		const from = route.hops[0].start.location.address
		const to = route.hops[route.hops.length - 1].end.location.address

		return (
			<div
				className={`drone ${selected ? 'selected' : ''}`}
				onClick={() => onClick(route)}>
				{from} &#8594; {to}
			</div>
		)
	}
}
