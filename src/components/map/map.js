import React from 'react'
import ReactMapGL from 'react-map-gl'
import { connect } from 'react-redux'

import { newHivesAction } from 'actions/hiveActions'
import { newShopsAction } from 'actions/shopActions'

import DeckGLOverlay from 'components/layers/layers'

@connect()
export default class Map extends React.Component {
	constructor(props) {
		super(props)

		this.map = {
			render: false,
		}

		this.state = {
			mapStyle: 'mapbox://styles/astwys/cjdufw9kf55dc2sqy8y73evyf',
			token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN, // eslint-disable-line
			viewport: {
				latitude: 48.210033,
				longitude: 16.363449,
				zoom: 12,
				maxZoom: 16.3,
				bearing: 0,
				pitch: 45,
				width: 800,
				height: 600,
				useDevicePixels: false,
			},
		}
	}

	componentWillMount() {
		this.map = {
			render: true,
		}

		const { hiveModels, shopModels } = this.props
		this.props.dispatch(newHivesAction(hiveModels))
		this.props.dispatch(newShopsAction(shopModels))
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
