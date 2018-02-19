import React from 'react'
import { connect } from 'react-redux'

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
				<p>Name: {selectedHive.name}</p>
				<p>
					Address:
					<div>{selectedHive.location.address}</div>
					<div>Longitude: {selectedHive.location.longitude}</div>
					<div>Latitude: {selectedHive.location.latitude}</div>
				</p>
				<p>Demand: {selectedHive.demand}</p>
			</div>
		)
	}
}
