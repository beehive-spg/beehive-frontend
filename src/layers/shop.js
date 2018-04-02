import { IconLayer } from 'deck.gl'
import shopIcon from './assets/shop.png'

const ICON_MAPPING = {
	'shop-icon': { x: 0, y: 0, width: 464, height: 541, anchorY: 541 },
}

const getIconSize = zoom => {
	if (zoom > 13) zoom = zoom / 10
	else zoom = 1
	return zoom
}

const shopLayer = (shops, onHover, zoom) => {
	const data = shops.map(shop => {
		const { location } = shop
		const position = [location.longitude, location.latitude]
		return {
			position,
			icon: 'shop-icon',
			size: 75,
			color: [0, 0, 0],
		}
	})
	const iconSize = getIconSize(zoom)
	return layer(data, onHover, iconSize)
}

const layer = (data, onHover, iconSize) => {
	return new IconLayer({
		id: 'layer-shop',
		data,
		iconAtlas: shopIcon,
		iconMapping: ICON_MAPPING,
		pickable: true,
		onHover,
		sizeScale: iconSize,
	})
}

export default shopLayer
