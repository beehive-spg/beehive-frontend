import React from 'react'

import './hiveSelect.css'

export default class HiveSelect extends React.Component {
	render() {
		const options = this.props.hives.map(hive => {
			const value = `${hive.id}-${this.props.position}`
			return <option value={value}>{hive.location}</option>
		})

		return (
			<div className="hiveSelect">
				<select onchange={this.props.onSelect}>{options}</select>
			</div>
		)
	}
}
