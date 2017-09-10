import React from 'react'
import DeckGL from 'deck.gl'
import PropTypes from 'prop-types'

import hiveLayer from 'src/mapbox/layers'

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

	addHives = hive => hiveLayer(hive)

	render() {
		const { viewport, data } = this.props

		return (
			<div>
				<DeckGL {...viewport} layers={data.hives.map(hive => this.addHives(hive))} />
			</div>
		)
	}
}
