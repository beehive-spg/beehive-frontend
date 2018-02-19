import React from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import Script from 'react-load-script'
import Geosuggest from 'react-geosuggest'
import Loader from 'halogen/BounceLoader'
import LaddaButton, { S, EXPAND_RIGHT } from 'react-ladda'
import addOrder from 'graphql/mutations/addOrder.gql'
import ShopSelect from './shopSelect/shopSelect'
import addressLookup from 'utils/geocoding'

import 'react-geosuggest/module/geosuggest.css'
import 'ladda/dist/ladda.min.css'
import './orderInput.css'

@connect(store => {
	return {
		shops: store.shop.shops,
	}
})
@graphql(addOrder)
export default class OrderInput extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			shop: this.getShopOptions()[0],
			customer: {
				address: '',
				longitude: null,
				latitude: null,
			},
			scriptLoaded: false,
			typing: false,
			orderLoading: false,
		}
	}

	async componentDidMount() {
		const location = await addressLookup(navigator.geolocation)

		if (!this.state.typing) {
			this.setState({
				customer: {
					address: location.address.formatted_address,
					longitude: location.longitude,
					latitude: location.latitude,
				},
			})
		}
	}

	onSelect(e) {
		this.setState({ shop: e })
	}

	handleSubmit(e) {
		e.preventDefault()

		this.setState({
			orderLoading: !this.state.orderLoading,
		})

		const order = {
			shop: this.state.shop.value,
			customer: this.state.customer,
		}
		this.props.mutate({ variables: { order } })

		this.toggleOrderLoading()
	}

	toggleOrderLoading() {
		setTimeout(() => {
			this.setState({
				orderLoading: !this.state.orderLoading,
			})
		}, 800)
	}

	onFocus() {
		if (!this.state.typing) {
			this.setState({ typing: true })
		}
	}

	onSuggestSelect(suggest) {
		if (!suggest) {
			this.setState({
				customer: {
					address: '',
					longitude: null,
					latitude: null,
				},
			})
			return
		}
		this.setState({
			customer: {
				address: suggest.description,
				longitude: suggest.location.lng,
				latitude: suggest.location.lat,
			},
		})
	}

	handleScriptLoad() {
		this.setState({ scriptLoaded: true })
	}

	getShopOptions() {
		return this.props.shops
			.map(shop => {
				return shop.shops.map(buildingShop => {
					return {
						value: buildingShop.id,
						label: `${buildingShop.name} - ${shop.location
							.address}`,
					}
				})
			})
			.flatten()
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

		const addressLoading = () => {
			if (this.state.customer.address === '' && !this.state.typing) {
				return (
					<div className="loader">
						<Loader color="#26A65B" size="16px" />
					</div>
				)
			}
			return null
		}

		return (
			<div className="orderInput">
				<div className="heading">Order</div>
				<hr />
				<div className="container">
					<form onSubmit={this.handleSubmit.bind(this)}>
						<p>
							From:
							<ShopSelect
								position="to"
								shops={this.getShopOptions()}
								selected={this.state.shop}
								onSelect={this.onSelect.bind(this)}
							/>
						</p>
						<p>
							To:
							<div className="addressInput">
								<Geosuggest
									placeholder="Enter address"
									initialValue={this.state.customer.address}
									onFocus={this.onFocus.bind(this)}
									onSuggestSelect={this.onSuggestSelect.bind(
										this,
									)}
								/>
								{addressLoading()}
							</div>
						</p>
						<p>
							<LaddaButton
								data-size={S}
								data-style={EXPAND_RIGHT}
								loading={this.state.orderLoading}
								onClick={this.handleSubmit.bind(this)}
								data-spinner-size={30}
								data-color="#eee"
								data-spinner-color="#ddd"
								data-spinner-lines={12}>
								Order now
							</LaddaButton>
						</p>
					</form>
				</div>
			</div>
		)
	}
}
