import React from 'react'
import { connect } from 'react-redux'

import Drone from './drone/drone'

@connect(store => {
	return {
		drones: store.info.drones,
	}
})
export default class DroneInfo extends React.Component {
	render() {
		const { drones } = this.props
		const droneComponents = drones.map(drone => <Drone drone={drone} />)

		return <div>{droneComponents}</div>
	}
}
