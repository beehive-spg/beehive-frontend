import React from 'react'

import './infoOverlay.css'

export default class InfoOverlay extends React.Component {
	renderInfos() {
		const { infos } = this.props
		if (infos.picked) {
			const split = infos.layer.split('-')

			if (split[1] === 'hive') return this.renderHiveInfo()
			else if (split[1] === 'shop') return this.renderShopInfo()
			else if (split[1] === 'customer') return this.renderCustomerInfo()
		}
	}

	renderHiveInfo() {
		const { infos } = this.props
		const hive = this.props.hives[infos.index]
		return (
			<div className="info" style={{ top: infos.y, left: infos.x }}>
				<div className="heading">Drone Port</div>
				<p>
					<div className="address">{hive.location.address}</div>
					<div>{hive.name}</div>
				</p>
			</div>
		)
	}

	renderShopInfo() {
		const { infos } = this.props
		const shop = this.props.shops[infos.index]
		const shops = shop.shops.map(shop => {
			return <div>{shop.name}</div>
		})

		return (
			<div className="info" style={{ top: infos.y, left: infos.x }}>
				<div className="heading">Shop</div>
				<p>
					<div className="address">{shop.location.address}</div>
					<div>{shops}</div>
				</p>
			</div>
		)
	}

	renderCustomerInfo() {
		const { infos } = this.props
		const customer = this.props.customers[infos.index]

		return (
			<div className="info" style={{ top: infos.y, left: infos.x }}>
				<div className="heading">Customer</div>
				<p>
					<div className="address">{customer.location.address}</div>
				</p>
			</div>
		)
	}

	render() {
		return <div>{this.renderInfos()}</div>
	}
}
