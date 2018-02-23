import React from 'react'
import {
	XYPlot,
	LineSeries,
	XAxis,
	YAxis,
	HorizontalGridLines,
	VerticalGridLines,
} from 'react-vis'

import 'react-vis/dist/style.css'

export default class DemandChart extends React.Component {
	constructor() {
		super()

		this.state = {
			init: [
				{ x: 0, y: 10 },
				{ x: 1, y: 10 },
				{ x: 1, y: 10 },
				{ x: 2, y: 10 },
				{ x: 3, y: 10 },
				{ x: 4, y: 10 },
				{ x: 5, y: 10 },
				{ x: 6, y: 10 },
				{ x: 7, y: 10 },
				{ x: 8, y: 10 },
				{ x: 9, y: 10 },
			],
		}
	}

	componentDidMount() {
		setInterval(() => {
			this.changeData()
		}, 2000)
	}

	changeData = () => {
		const data = this.state.init.map(set => {
			return {
				x: set.x,
				y: set.y * Math.random(),
			}
		})

		this.setState({ data })
	}

	render() {
		return (
			<div className="demandChart">
				<XYPlot height={200} width={250}>
					<XAxis />
					<YAxis />
					<HorizontalGridLines />
					<VerticalGridLines />
					<LineSeries animation data={this.state.data} />
				</XYPlot>
			</div>
		)
	}
}
