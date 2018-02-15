import React from 'react'
import Select from 'react-select'

import 'react-select/dist/react-select.css'
import './shopSelect.css'

export default class ShopSelect extends React.Component {
	render() {
		const { selected, onSelect, shops } = this.props
		return (
			<Select
				name="shopSelect"
				value={selected.value}
				onChange={onSelect}
				options={shops}
				clearable={false}
			/>
		)
	}
}
