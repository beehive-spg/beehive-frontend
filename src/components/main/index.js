import React from 'react'
import Helmet from 'react-helmet'

import Map from 'components/map'

export default () => (
	<div>
		<Helmet title="Drone Logistics Network" />
		<h1>Beehive</h1>
		<Map />
	</div>
)
