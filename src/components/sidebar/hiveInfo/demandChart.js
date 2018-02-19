import React from 'react'
import {
	XYPlot,
	LineSeries,
	// XAxis,
	// YAxis,
	// HorizontalGridLines,
	// VerticalGridLines,
} from 'react-vis'

import 'react-vis/dist/style.css'

export default class DemandChart extends React.Component {
	constructor() {
		super()

		this.state = {
			init: [
				{ x: 0, y: 8 },
				{ x: 1, y: 8 },
				{ x: 1, y: 4 },
				{ x: 2, y: 4 },
				{ x: 3, y: 5 },
				{ x: 4, y: 1 },
				{ x: 5, y: 7 },
				{ x: 6, y: 7 },
				{ x: 7, y: 3 },
				{ x: 8, y: 2 },
				{ x: 9, y: 6 },
			],
		}
	}

	componentDidMount() {
		setInterval(() => {
			this.changeData()
		}, 1000)
	}

	changeData = () => {
		const data = this.state.init.map(set => {
			set.y = set.y * Math.random()
			return set
		})

		this.setState({ data })
	}

	render() {
		return (
			<div className="demandChart">
				<XYPlot height={200} width={250}>
					<LineSeries data={this.state.data} />
				</XYPlot>
			</div>
		)
	}
}
