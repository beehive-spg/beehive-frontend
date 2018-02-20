import React from 'react'
import { connect } from 'react-redux'

import DemandChart from './demandChart'

import './hiveInfo.css'

@connect(store => {
	return {
		selectedHive: store.info.selectedHive,
	}
})
export default class HiveInfo extends React.Component {
	render() {
		const { selectedHive } = this.props

		if (!selectedHive) return null
		return (
			<div className="hiveInfo">
				<div className="name">{selectedHive.name}</div>
				<div className="location">
					<div className="address">
						{selectedHive.location.address}
					</div>
					<div>Longitude: {selectedHive.location.longitude}</div>
					<div>Latitude: {selectedHive.location.latitude}</div>
				</div>
				<div className="demand">Demand: {selectedHive.demand}</div>
				<DemandChart />
			</div>
		)
	}
}
