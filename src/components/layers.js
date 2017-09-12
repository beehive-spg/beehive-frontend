import React from 'react'
import DeckGL from 'deck.gl'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addHives } from 'src/actions/hiveActions'
import addHiveLayer from 'src/mapbox/layers'

import style from './layers.sass'

@connect(store => ({
	hives: store.hives.data,
}))
export default class MapLayers extends React.Component {
	static propTypes = {
		hives: PropTypes.array,
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
		hives: null,
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
			hoveredItem: null,
		}
	}

	componentWillMount() {
		if (!SERVER) {
			const { data } = this.props
			this.props.dispatch(addHives(data.hives))
		}
	}

	onHover = ({ x, y, layer, picked }) => {
		const { data } = this.props
		const layerName = layer.id
		const layerParts = layerName.split('-')
		const hive = data.hives.find(h => h.id === layerParts[2])
		this.setState({ hoveredItem: hive, x, y, picked })
	}

	addHiveLayers() {
		const layers = []
		this.props.hives.map(hive => layers.push(addHiveLayer(hive, this.onHover)))

		return layers
	}

	renderHiveInfo() {
		const { x, y, hoveredItem, picked } = this.state

		if (!picked) {
			return null
		}

		return (
			hoveredItem && (
				<div className={style.hiveInfo} style={{ top: y, left: x }}>
					<div>Location:</div>
					<p>{hoveredItem.location}</p>
				</div>
			)
		)
	}

	render() {
		const { viewport } = this.props

		return (
			<div>
				<DeckGL {...viewport} layers={this.addHiveLayers()} />
				{this.renderHiveInfo()}
			</div>
		)
	}
}
