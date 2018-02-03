import React from 'react'

import './hive.css'
const Hive = ({ hive }) => (
	<div className="hive">
		{hive.name}, {hive.location.address}
	</div>
)

export default Hive
