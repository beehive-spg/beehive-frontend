import React from 'react'
import ReactMapGL from 'react-map-gl'

import Layers from './layers'

export default class Map extends React.Component {
	constructor(props) {
		super(props)

		this.map = {
			render: false,
		}

		this.state = {
			mapStyle: 'mapbox://styles/mapbox/streets-v10',
			token:
				'pk.eyJ1IjoiYXN0d3lzIiwiYSI6ImNqNTBzbHMzYTJkMTkycXFqOHV2bDFwc28ifQ.BAEjuFoOh6TfXlYKwRfRrg',
			viewport: {
				latitude: 48.210033,
				longitude: 16.363449,
				zoom: 11,
				maxZoom: 16.3,
				bearing: 0,
				pitch: 50,
				width: 800,
				height: 600,
			},
		}
	}

	componentWillMount() {
		this.map = {
			render: true,
		}
	}

	onViewportChange = viewport => this.setState({ viewport })

	render() {
		const { viewport, mapStyle, token } = this.state

		if (!this.map.render) {
			return <div />
		}

		return (
			<div>
				<ReactMapGL
					{...viewport}
					debug
					mapStyle={mapStyle}
					mapboxApiAccessToken={token}
					onViewportChange={this.onViewportChange}>
					<Layers viewport={viewport} />
				</ReactMapGL>
			</div>
		)
	}
}
