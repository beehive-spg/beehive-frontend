import React from 'react'

import './drone.css'
const Drone = ({ drone }) => (
	<div className="drone">
		{drone.from.location} &#8594; {drone.to.location}
	</div>
)

export default Drone
