import React from 'react'

import './infoOverlay.css'

export default class InfoOverlay extends React.Component {
	renderInfos() {
		const { infos } = this.props
		if (infos.picked) {
			const split = infos.layer.split('-')

			if (split[1] === 'hive') return this.renderHiveInfo()
			else if (split[1] === 'shop') return this.renderShopInfo()
		}
	}

	renderHiveInfo() {
		const { infos } = this.props
		const hive = this.props.hives[infos.index]
		return (
			<div className="info" style={{ top: infos.y, left: infos.x }}>
				<div>Drone Port</div>
				<p>
					<div>Address: {hive.location.address}</div>
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
				<div>Shop</div>
				<p>
					<div>Address: {shop.location.address}</div>
					<div>{shops}</div>
				</p>
			</div>
		)
	}

	render() {
		return <div>{this.renderInfos()}</div>
	}
}
