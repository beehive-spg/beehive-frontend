import React from 'react'
import Switch from 'rc-switch'
import { connect } from 'react-redux'

import RouteInfo from './routeInfo/routeInfo'
import HiveInfo from './hiveInfo/hiveInfo'

import { changeInfo } from 'actions/infoActions'

import './rc-switch.css'
import './sidebar.css'

@connect(store => {
	return {
		sidebarInfo: store.info.sidebarInfo,
	}
})
export default class Sidebar extends React.Component {
	onChange() {
		this.props.dispatch(changeInfo(this.props.sidebarInfo))
	}

	render() {
		const { sidebarInfo } = this.props

		let infoContainer = null

		if (sidebarInfo === 'Routes') {
			infoContainer = <RouteInfo />
		} else if (sidebarInfo === 'Drone Ports') {
			infoContainer = <HiveInfo />
		}

		return (
			<div className="sidebar">
				<div className="heading">{sidebarInfo}</div>
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
