import React from 'react'
import ReactMapGL from 'react-map-gl'

import Layers from 'components/layers/layers'

export default class Map extends React.Component {
	constructor(props) {
		super(props)

		this.map = {
			render: false,
		}

		this.state = {
			mapStyle: 'mapbox://styles/astwys/cj8ojdf298rid2rnr6qq9y0tn',
			token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN, // eslint-disable-line
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
