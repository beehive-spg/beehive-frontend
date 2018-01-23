import React from 'react'
import ReactMapGL from 'react-map-gl'

import DeckGLOverlay from 'components/layers/layers'

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
				pitch: 0,
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

	componentDidMount() {
		window.addEventListener('resize', this._resize)
		this._resize()
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this._resize)
	}

	_resize = () => {
		this.setState({
			viewport: {
				...this.state.viewport,
				width: this.props.width || window.innerWidth,
				height: this.props.height || window.innerHeight,
			},
		})
	}

	onViewportChange = viewport => this.setState({ viewport })

	render() {
		if (!this.map.render) {
			return null
		}

		const { viewport, mapStyle, token } = this.state

		return (
			<ReactMapGL
				{...viewport}
				debug
				mapStyle={mapStyle}
				mapboxApiAccessToken={token}
				onViewportChange={this.onViewportChange}>
				<DeckGLOverlay viewport={viewport} />
			</ReactMapGL>
		)
	}
}
