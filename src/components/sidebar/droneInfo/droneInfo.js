import React from 'react'
import { connect } from 'react-redux'

import { selectDrone } from 'redux/actions/infoActions'

import Drone from './drone/drone'

@connect(store => {
	return {
		drones: store.info.drones,
		selectedDrone: store.info.selectedDrone,
	}
})
export default class DroneInfo extends React.Component {
	onClick = drone => {
		const { selectedDrone } = this.props
		if (drone === selectedDrone) {
			drone = null
		}

		this.props.dispatch(selectDrone(drone))
	}

	render() {
		const { drones } = this.props
		const droneComponents = drones.map(drone => {
			let selected = false
			if (drone.id === this.props.selectedDrone) {
				selected = true
			}

			return (
				<Drone
					drone={drone}
					onClick={this.onClick}
					selected={selected}
				/>
			)
		})

		return <div>{droneComponents}</div>
	}
}
