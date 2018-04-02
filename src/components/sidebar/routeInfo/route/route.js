import React from 'react'

import './route.css'

export default class Route extends React.Component {
	render() {
		const { route, from, to, onClick, selected } = this.props
		return (
			<div
				className={`drone ${selected ? 'selected' : ''}`}
				onClick={() => onClick(route)}>
				{from} &#8594; {to}
			</div>
		)
	}
}
