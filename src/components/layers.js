import React from 'react'
import DeckGL from 'deck.gl'
import PropTypes from 'prop-types'

import hiveLayer from 'src/mapbox/layers'

import style from './layers.sass'

export default class MapLayers extends React.Component {
	static propTypes = {
		data: PropTypes.shape({
			hive: PropTypes.shape({
				id: PropTypes.number,
				coordinates: PropTypes.shape({
					longitude: PropTypes.number,
					latitude: PropTypes.number,
				}),
			}),
		}),
		viewport: PropTypes.shape({
			latitude: PropTypes.number,
			longitude: PropTypes.number,
			zoom: PropTypes.number,
			bearing: PropTypes.number,
			pitch: PropTypes.number,
			width: PropTypes.number,
			height: PropTypes.number,
		}),
	}

	static defaultProps = {
		data: {
			hive: {
				id: null,
				coordinates: {
					longitude: null,
					latitude: null,
				},
			},
		},
		viewport: {
			latitude: null,
			longitude: null,
			zoom: null,
			bearing: null,
			pitch: null,
			width: null,
			height: null,
		},
	}

	constructor(props) {
		super(props)

		this.state = {
			clickedItem: null,
		}
	}

	onClick = ({ x, y, layer }) => {
		const { data } = this.props
		const layerName = layer.id
		const layerParts = layerName.split('-')
		const hive = data.hives.find(h => h.id === layerParts[2])
		this.setState({ clickedItem: hive, x, y })

		console.log(this.state) //eslint-disable-line
		// console.log(data) //eslint-disable-line
		// console.log(info) //eslint-disable-line
		// console.log(x, y, layer) //eslint-disable-line
	}

	addHives = hive => hiveLayer(hive, this.onClick)

	renderHiveInfo() {
		const { x, y, clickedItem } = this.state

		return (
			clickedItem && (
				<div className={style.hiveInfo} style={{ top: y, left: x }}>
					<div>Location:</div>
					<p>{clickedItem.location}</p>
				</div>
			)
		)
	}

	render() {
		const { viewport, data } = this.props

		return (
			<div>
				<DeckGL {...viewport} layers={data.hives.map(hive => this.addHives(hive))} />
				{this.renderHiveInfo()}
			</div>
		)
	}
}
