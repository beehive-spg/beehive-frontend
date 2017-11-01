import React from 'react'
import Switch from 'rc-switch'
import { connect } from 'react-redux'

import Drone from './drone/drone'

import './rc-switch.css'
import './sidebar.css'

@connect(store => {
	return {
		drones: store.info.drones,
	}
})
export default class Sidebar extends React.Component {
	onChange(value) {
		console.log(value) //eslint-disable-line
	}

	render() {
		const { drones } = this.props
		const droneComponents = drones.map(drone => <Drone drone={drone} />)

		return (
			<div className="sidebar">
				<div className="heading">Drones</div>
				<hr />
				<div className="container">{droneComponents}</div>
				<Switch
					className="switch"
					onChange={this.onChange.bind(this)}
					checkedChildren={'D'}
					unCheckedChildren={'P'}
				/>
			</div>
		)
	}
}
