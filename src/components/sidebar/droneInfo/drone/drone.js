import React from 'react'

import './drone.css'
const Drone = ({ drone, onClick, selected }) => (
	<div
		className={`drone ${selected ? 'selected' : ''}`}
		onclick={() => onClick(drone.id)}>
		{drone.from.location} &#8594; {drone.to.location}
	</div>
)

export default Drone
