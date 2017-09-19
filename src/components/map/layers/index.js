import React from 'react'
import DeckGL from 'deck.gl'
import { graphql } from 'react-apollo'

import { addHiveLayer } from 'mapbox/layers'
import allHives from 'graphql/queries/all_hives.gql'
import hiveAdded from 'graphql/subscriptions/hive_added.gql'

import './layers.css'

@graphql(allHives)
export default class MapLayers extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			hoveredItem: null,
		}
	}

	componentWillMount() {
		this.props.data.subscribeToMore({
			document: hiveAdded,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev
				}
				const newHive = subscriptionData.data.hiveAdded
				return {
					...prev,
					hives: [...prev.hives, newHive],
				}
			},
		})
	}

	onHover = ({ x, y, layer, picked }) => {
		const { data } = this.props
		const layerName = layer.id
		const layerParts = layerName.split('-')
		const hive = data.hives.find(h => h.id === layerParts[2])
		this.setState({ hoveredItem: hive, x, y, picked })
	}

	addHiveLayers() {
		const { data } = this.props

		const layers = []
		data.hives.map(hive => layers.push(addHiveLayer(hive, this.onHover)))

		return layers
	}

	renderHiveInfo() {
		const { x, y, hoveredItem, picked } = this.state

		if (!picked) {
			return null
		}

		return (
			hoveredItem && (
				<div className="hiveInfo" style={{ top: y, left: x }}>
					<div>Location:</div>
					<p>{hoveredItem.location}</p>
				</div>
			)
		)
	}

	render() {
		const { viewport, data } = this.props

		if (data.loading) {
			return <div>loading...</div>
		}

		return (
			<div>
				<DeckGL {...viewport} layers={this.addHiveLayers()} />
				{this.renderHiveInfo()}
			</div>
		)
	}
}
