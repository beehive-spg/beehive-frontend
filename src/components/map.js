import React from 'react'
import ReactMapGL from 'react-map-gl'
import { graphql } from 'react-apollo'

import allHives from 'src/graphql/queries/all_hives.gql'
import Layers from './layers'

@graphql(allHives)
export default class Map extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			mapStyle: 'mapbox://styles/astwys/cj7cb3os4awat2roc87oynk05',
			token:
				'pk.eyJ1IjoiYXN0d3lzIiwiYSI6ImNqNTBzbHMzYTJkMTkycXFqOHV2bDFwc28ifQ.BAEjuFoOh6TfXlYKwRfRrg',
			viewport: {
				latitude: 48.210033,
				longitude: 16.363449,
				zoom: 11,
				bearing: 0,
				pitch: 50,
				width: 800,
				height: 600,
			},
			hiveInfo: null,
		}
	}

	onViewportChange = viewport => this.setState({ viewport })

	render() {
		const { viewport, mapStyle, token } = this.state
		const { data } = this.props

		if (data.loading) {
			return <div>loading...</div>
		}

		return (
			<div>
				<ReactMapGL
					{...viewport}
					debug
					mapStyle={mapStyle}
					mapboxApiAccessToken={token}
					onViewportChange={this.onViewportChange}>
					<Layers viewport={viewport} data={data} />
				</ReactMapGL>
			</div>
		)
	}
}
