import React from 'react'
import Switch from 'rc-switch'

import DroneInfo from './droneInfo/droneInfo'

import './rc-switch.css'
import './sidebar.css'

export default class Sidebar extends React.Component {
	onChange(value) {
		console.log(value) //eslint-disable-line
	}

	render() {
		return (
			<div className="sidebar">
				<div className="heading">Drones</div>
				<hr />
				<div className="container">
					<DroneInfo />
				</div>
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
