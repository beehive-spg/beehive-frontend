import React from 'react'
import {
	XYPlot,
	LineSeries,
	XAxis,
	YAxis,
	HorizontalGridLines,
	VerticalGridLines,
} from 'react-vis'
import { graphql } from 'react-apollo'
import { format, subHours, addMinutes } from 'date-fns'
import { statistics } from 'graphql/queries'

import 'react-vis/dist/style.css'

@graphql(statistics, {
	options: ({ hive }) => ({
		variables: {
			id: hive,
		},
		pollInterval: 1000,
	}),
})
export default class DemandChart extends React.Component {
	transformData = statistics => {
		if (statistics.length > 1) {
			return statistics.map(section => {
				return {
					x: parseInt(section.time),
					y: section.value,
				}
			})
		} else {
			let sections = []
			for (let i = 0; i < 6; i++) {
				sections.push({
					x: addMinutes(new Date(), i),
					y: statistics[0].value,
				})
			}
			return sections
		}
	}

	render() {
		const { data } = this.props
		if (data.loading) return null

		const statistics = this.transformData(data.statistics)
		return (
			<div className="demandChart">
				<XYPlot height={200} width={250}>
					<XAxis
						tickFormat={v => format(subHours(v, 1), 'HH:mm:SS')}
						tickLabelAngle={-22.5}
					/>
					<YAxis />
					<HorizontalGridLines />
					<VerticalGridLines />
					<LineSeries animation data={statistics} />
				</XYPlot>
			</div>
		)
	}
}
