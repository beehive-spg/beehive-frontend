import React from 'react'
import { connect } from 'react-redux'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import RouteInfo from './routeInfo/routeInfo'
import HiveInfo from './hiveInfo/hiveInfo'

import './rc-switch.css'
import './sidebar.css'

@connect(store => {
	return {
		selectedHive: store.info.selectedHive,
	}
})
export default class Sidebar extends React.Component {
	getHiveHeader = () => {
		let header = this.props.selectedHive
			? this.props.selectedHive.name
			: 'Drone Port'

		const length = 10

		if (header.length > length) {
			header = header.substr(0, length) + '...'
		}

		return header
	}
	render() {
		return (
			<div className="sidebar">
				<Tabs className="tabs" renderActiveTabContentOnly={true}>
					<TabLink className="tab-link tab-routes" to="routes">
						Routes
					</TabLink>
					<TabLink className="tab-link tab-hives" to="hives">
						{this.getHiveHeader()}
					</TabLink>
					<TabContent for="routes">
						<div className="container">
							<RouteInfo />
						</div>
					</TabContent>
					<TabContent for="hives">
						<div className="container">
							<HiveInfo />
						</div>
					</TabContent>
				</Tabs>
			</div>
		)
	}
}
