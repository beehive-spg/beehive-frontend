import { IconLayer } from 'deck.gl'
import customerIcon from './assets/customer.png'

const ICON_MAPPING = {
	'customer-icon': { x: 0, y: 0, width: 362, height: 540, anchorY: 540 },
}

const getIconSize = zoom => {
	if (zoom > 13) zoom = zoom / 10
	else zoom = 1
	return zoom
}

const customerLayer = (customers, onHover, zoom, type, visible) => {
	const data = customers.map(customer => {
		const { location } = customer
		const position = [location.longitude, location.latitude]
		return {
			position,
			icon: 'customer-icon',
			size: 80,
			color: [0, 0, 0],
		}
	})
	const iconSize = getIconSize(zoom)
	return layer(data, onHover, iconSize, type, visible)
}

const layer = (data, onHover, iconSize, type, visible) => {
	return new IconLayer({
		id: `layer-customer-${type}`,
		data,
		visible,
		iconAtlas: customerIcon,
		iconMapping: ICON_MAPPING,
		pickable: true,
		onHover,
		sizeScale: iconSize,
	})
}

export default customerLayer
