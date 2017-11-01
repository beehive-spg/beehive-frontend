import React from 'react'
import { connect } from 'react-redux'

import Drone from './drone/drone'

import './sidebar.css'

@connect(store => {
	return {
		drones: store.info.drones,
	}
})
export default class Sidebar extends React.Component {
	render() {
		const { drones } = this.props
		const droneComponents = drones.map(drone => <Drone drone={drone} />)

		return (
			<div className="sidebar">
				<div className="heading">Drones</div>
				<hr />
				<div className="container">{droneComponents}</div>
			</div>
		)
	}
}
