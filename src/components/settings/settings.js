import React from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { Button, Modal } from 'semantic-ui-react'
import Switch from 'rc-switch'
import Slider from 'rc-slider'

import { setDistribution, setRouting, setDrones } from 'actions/settingsActions'
import { settings } from 'graphql/queries'
import { setDist, setRout, setDron } from 'graphql/mutations'

import 'semantic-ui-css/semantic.min.css'
import 'rc-switch/assets/index.css'
import 'rc-slider/assets/index.css'
import './settings.css'

@connect(store => {
	return {
		dist: store.settings.dist,
		rout: store.settings.rout,
		drones: store.settings.drones,
	}
})
// @graphql(settings)
// @graphql(
// compose(
// graphql(settings, {
// name: 'settingsQuery',
// }),
// graphql(setDist, {
// name: 'distMutation',
// }),
// graphql(setRout, {
// name: 'routMutation',
// }),
// graphql(setDron, {
// name: 'dronesMutation',
// }),
// ),
// )
/*export default */
class Settings extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			init: false,
			open: false,
			dist: {
				prev: null,
				current: this.props.dist,
			},
			rout: {
				prev: null,
				current: this.props.rout,
			},
			drones: {
				prev: null,
				current: this.props.drones,
			},
		}
	}

	componentWillReceiveProps(newProps) {
		if (
			!newProps.settingsQuery.loading &&
			this.props.settingsQuery.settings !==
				newProps.settingsQuery.settings
		) {
			this.initSettings(newProps.settingsQuery.settings)
		}
	}

	initSettings = settings => {
		this.setState({
			init: true,
			dist: {
				...this.state.dist,
				current: settings.distribution,
			},
			rout: {
				...this.state.rout,
				current: settings.routing,
			},
			drones: {
				...this.state.drones,
				current: settings.drones,
			},
		})
	}

	onOpenModal = () => {
		const { dist, rout, drones } = this.state
		this.setState({
			open: true,
			dist: {
				...this.state.dist,
				prev: dist.current,
			},
			rout: {
				...this.state.rout,
				prev: rout.current,
			},
			drones: {
				...this.state.drones,
				prev: drones.current,
			},
		})
	}

	onCloseModal = () => {
		const { dist, rout, drones } = this.state
		this.setState({
			open: false,
			dist: {
				...this.state.dist,
				current: dist.prev,
			},
			rout: {
				...this.state.rout,
				current: rout.prev,
			},
			drones: {
				...this.state.drones,
				current: drones.prev,
			},
		})
	}

	onChaneDist = () => {
		const newDist = !this.state.dist.current
		this.setState({ dist: { ...this.state.dist, current: newDist } })
	}

	onChangeRout = () => {
		const newRout = !this.state.rout.current
		this.setState({ rout: { ...this.state.rout, current: newRout } })
	}

	onChangeSlider = value => {
		this.setState({ drones: { ...this.state.drones, current: value } })
	}

	handleApply = () => {
		const { dist, rout, drones } = this.state
		this.setState({ open: false })

		if (dist.prev !== dist.current) {
			this.props.dispatch(setDistribution(dist.current))
			this.props.distMutation({ variables: { dist: dist.current } })
		}
		if (rout.prev !== rout.current) {
			this.props.dispatch(setRouting(rout.current))
			this.props.routMutation({ variables: { rout: rout.current } })
		}
		if (drones.prev !== drones.current) {
			this.props.dispatch(setDrones(drones.current))
			this.props.dronesMutation({ variables: { drones: drones.current } })
		}
	}

	handleDiscard = () => {
		this.onCloseModal()
	}

	render() {
		const { settingsQuery } = this.props
		if (settingsQuery.loading) return null

		const marks = {
			0: '0',
			50: '50',
		}
		return (
			<Modal
				className="settings"
				size={'small'}
				open={this.state.open}
				onOpen={this.onOpenModal.bind(this)}
				onClose={this.onCloseModal.bind(this)}
				trigger={<Button className="settingsButton">Settings</Button>}>
				<Modal.Header>Settings</Modal.Header>
				<Modal.Content>
					<p className="setting-dist">
						Distribution Engine:<br />
						<Switch
							className="dist-switch"
							checkedChildren={'O'}
							unCheckedChildren={'I'}
							defaultChecked={this.state.dist.current}
							onChange={this.onChaneDist.bind(this)}
						/>
					</p>
					<p className="setting-rout">
						Intelligent Routing:<br />
						<Switch
							className="dist-switch"
							checkedChildren={'O'}
							unCheckedChildren={'I'}
							defaultChecked={this.state.rout.current}
							onChange={this.onChangeRout.bind(this)}
						/>
					</p>
					<div className="setting-orders">
						Orders per Minute: {this.state.drones.current}
						<Slider
							min={0}
							max={50}
							step={5}
							marks={marks}
							defaultValue={this.state.drones.current}
							onChange={this.onChangeSlider}
						/>
					</div>
				</Modal.Content>
				<Modal.Actions>
					<Button
						color="black"
						onClick={this.handleDiscard.bind(this)}>
						Discard
					</Button>
					<Button
						positive
						icon="checkmark"
						labelPosition="right"
						content="Apply"
						onClick={this.handleApply.bind(this)}
					/>
				</Modal.Actions>
			</Modal>
		)
	}
}

export default compose(
	graphql(settings, {
		name: 'settingsQuery',
	}),
	graphql(setDist, {
		name: 'distMutation',
	}),
	graphql(setRout, {
		name: 'routMutation',
	}),
	graphql(setDron, {
		name: 'dronesMutation',
	}),
)(Settings)
