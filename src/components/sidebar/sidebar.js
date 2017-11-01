import React from 'react'
import Switch from 'rc-switch'
import { connect } from 'react-redux'

import DroneInfo from './droneInfo/droneInfo'
import HiveInfo from './hiveInfo/hiveInfo'

import { changeInfo } from 'redux/actions/infoActions'

import './rc-switch.css'
import './sidebar.css'

@connect(store => {
	return {
		currentInfo: store.info.currentInfo,
	}
})
export default class Sidebar extends React.Component {
	onChange() {
		this.props.dispatch(changeInfo(this.props.currentInfo))
	}

	render() {
		const { currentInfo } = this.props

		let infoContainer = null

		if (currentInfo === 'Drones') {
			infoContainer = <DroneInfo />
		} else if (currentInfo === 'Drone Ports') {
			infoContainer = <HiveInfo />
		}

		return (
			<div className="sidebar">
				<div className="heading">{currentInfo}</div>
				<hr />
				<div className="container">{infoContainer}</div>
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
