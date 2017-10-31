import React from 'react'
import Helmet from 'react-helmet'

import Map from 'components/map/map'
import Sidebar from 'components/sidebar/sidebar'

export default () => (
	<div>
		<Helmet title="Drone Logistics Network" />
		<Map />
		<Sidebar />
	</div>
)
