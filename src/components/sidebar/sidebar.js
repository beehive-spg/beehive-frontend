import React from 'react'
import Drone from './drone/drone'

import './sidebar.css'

export default class Sidebar extends React.Component {
	render() {
		const { data } = this.props
		const drones = data.drones.map(drone => <Drone drone={drone} />)

		return (
			<div className="sidebar">
				<div className="heading">Drones</div>
				<hr />
				<div className="container">{drones}</div>
			</div>
		)
	}
}
