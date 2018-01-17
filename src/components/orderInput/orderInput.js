import React from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import Script from 'react-load-script'
import Geosuggest from 'react-geosuggest'
import addOrder from 'graphql/mutations/addOrder.gql'
import HiveSelect from './hiveSelect/hiveSelect'
import addressLookup from 'utils/geocoding'

import './orderInput.css'
import './geosuggest.css'

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
			to: this.props.hives[1].id,
			scriptLoaded: false,
			typing: false,
		}
	}

	async componentDidMount() {
		const address = await addressLookup(navigator.geolocation)
		if (!this.state.typing) {
			this.setState({ currentAddress: address.formatted_address })
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

	onFocus() {
		if (!this.state.typing) {
			this.setState({ typing: true })
		}
	}

	onSuggestSelect(suggest) {
		this.setState({ currentAddress: suggest.gmaps.formatted_address })
	}

	handleScriptLoad() {
		this.setState({ scriptLoaded: true })
	}

	render() {
		if (!this.state.scriptLoaded) {
			const apiKey = process.env.REACT_APP_GOOGLE_API_KEY //eslint-disable-line
			const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
			return (
				<Script
					url={apiUrl}
					onLoad={this.handleScriptLoad.bind(this)}
				/>
			)
		}

		const fromHiveOptions = this.props.hives.filter(hive => {
			if (hive.id !== this.state.to) {
				return { id: hive.id, location: hive.location }
			}
		})
		const toHiveOptions = this.props.hives.filter(hive => {
			if (hive.id !== this.state.from) {
				return { id: hive.id, location: hive.location }
			}
		})

		return (
			<div className="orderInput">
				<div className="heading">New Order</div>
				<hr />
				<div className="container">
					<form onSubmit={this.handleSubmit.bind(this)}>
						<Geosuggest
							placeholder="Enter address"
							initialValue={this.state.currentAddress}
							onFocus={this.onFocus.bind(this)}
							onSuggestSelect={this.onSuggestSelect.bind(this)}
						/>
						<p>
							From:
							<HiveSelect
								position="from"
								hives={fromHiveOptions}
								onSelect={this.onSelect.bind(this)}
							/>
						</p>
						<p>
							To:
							<HiveSelect
								position="to"
								hives={toHiveOptions}
								onSelect={this.onSelect.bind(this)}
							/>
						</p>
						<input type="submit" value="Order now" />
					</form>
				</div>
			</div>
		)
	}
}
