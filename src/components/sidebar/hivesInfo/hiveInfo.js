import React from 'react'
import { connect } from 'react-redux'

import Hive from './hive/hive'

@connect(store => {
	return {
		hives: store.hive.hives,
	}
})
export default class DroneInfo extends React.Component {
	render() {
		const { hives } = this.props
		const hiveComponents = hives.map(hive => <Hive hive={hive} />)

		return <div>{hiveComponents}</div>
	}
}
