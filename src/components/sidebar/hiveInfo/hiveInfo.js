import React from 'react'
import { connect } from 'react-redux'

import DemandChart from './demandChart'

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
			<div>
				<div>Name: {selectedHive.name}</div>
				<div>
					Address:
					<div>{selectedHive.location.address}</div>
					<div>Longitude: {selectedHive.location.longitude}</div>
					<div>Latitude: {selectedHive.location.latitude}</div>
				</div>
				<div>Demand: {selectedHive.demand}</div>
				<DemandChart />
			</div>
		)
	}
}
