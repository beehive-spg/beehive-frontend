import React from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import addOrder from 'graphql/mutations/addOrder.gql'
import HiveSelect from './hiveSelect/hiveSelect'

import './orderInput.css'

@connect(store => {
	return {
		hives: store.hive.hives,
	}
})
@graphql(addOrder)
export default class OrderInput extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			from: this.props.hives[0].id,
			to: this.props.hives[0].id,
		}
	}
	onSelect(e) {
		const parts = e.target.value.split('-')
		if (parts[1] === 'from') {
			this.setState({
				from: parts[0],
			})
		} else if (parts[1] === 'to') {
			this.setState({
				to: parts[0],
			})
		}
	}
	handleSubmit(e) {
		e.preventDefault()
		const customerHive = this.props.hives.find(
			hive => hive.id === this.state.to,
		)
		const customer = {
			coordinates: {
				location: customerHive.location,
				longitude: customerHive.data[0].position[1],
				latitude: customerHive.data[0].position[0],
			},
		}
		const order = {
			shop: this.state.from,
			customer,
		}
		this.props.mutate({ variables: { order } })
	}

	render() {
		const hiveOptions = this.props.hives.map(hive => {
			return { id: hive.id, location: hive.location }
		})
		return (
			<div className="orderInput">
				<div className="heading">New Order</div>
				<hr />
				<div className="container">
					<form onSubmit={this.handleSubmit.bind(this)}>
						<p>
							From:
							<HiveSelect
								position="from"
								hives={hiveOptions}
								onSelect={this.onSelect.bind(this)}
							/>
						</p>
						<p>
							To:
							<HiveSelect
								position="to"
								hives={hiveOptions}
								onSelect={this.onSelect.bind(this)}
							/>
						</p>
						<input type="submit" value="Send" />
					</form>
				</div>
			</div>
		)
	}
}
