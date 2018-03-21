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
import {
	addHours,
	subHours,
	addMinutes,
	differenceInMinutes,
	differenceInSeconds,
} from 'date-fns'
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
			return statistics.reduce(
				(acc, section) => {
					if (!acc.last) {
						acc.data.push({
							x: parseInt(section.time, 10),
							y: section.value,
						})
					} else {
						acc.data.push(
							{
								x: parseInt(section.time, 10),
								y: acc.last.value,
							},
							{
								x: parseInt(section.time, 10),
								y: section.value,
							},
						)
					}

					acc.last = section
					return acc
				},
				{
					data: [],
					last: null,
				},
			).data
		} else {
			let sections = []
			for (let i = 0; i < 6; i++) {
				sections.push({
					x: addHours(addMinutes(new Date(), i), 1),
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
		let yTicks = statistics.map(section => section.y)
		yTicks = [...new Set([0, ...yTicks])]

		return (
			<div className="demandChart">
				<XYPlot height={200} width={275} stacked={'x'}>
					<XAxis
						tickLabelAngle={-22.5}
						tickFormat={v => {
							const date = new Date()
							let diff = differenceInSeconds(subHours(v, 1), date)
							if (diff / 60 >= 1) {
								diff = `${differenceInMinutes(
									subHours(v, 1),
									date,
								)} min`
							} else {
								diff = `${diff} sec`
							}
							return diff
						}}
					/>
					<YAxis tickValues={yTicks} />
					<HorizontalGridLines />
					<VerticalGridLines />
					<LineSeries animation data={statistics} />
				</XYPlot>
			</div>
		)
	}
}
