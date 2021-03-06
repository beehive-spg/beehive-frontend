import React from 'react'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import RouteInfo from './routeInfo/routeInfo'
import HiveInfo from './hiveInfo/hiveInfo'

import './sidebar.css'

export default class Sidebar extends React.Component {
	render() {
		return (
			<div className="sidebar">
				<Tabs className="tabs" renderActiveTabContentOnly={true}>
					<TabLink className="tab-link tab-routes" to="routes">
						Routes
					</TabLink>
					<TabLink className="tab-link tab-hives" to="hive">
						Drone Port
					</TabLink>
					<TabContent for="routes">
						<div className="container">
							<RouteInfo />
						</div>
					</TabContent>
					<TabContent for="hive">
						<div className="container">
							<HiveInfo />
						</div>
					</TabContent>
				</Tabs>
			</div>
		)
	}
}
