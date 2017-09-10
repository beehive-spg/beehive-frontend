import React from 'react'
import Helmet from 'react-helmet'

import Map from 'src/components/map'

import css from './main.sass'

export default () => (
	<div>
		<Helmet title="Drone Logistics Network" />
		<h1 className={css.heading}>Beehive</h1>
		<Map />
	</div>
)
