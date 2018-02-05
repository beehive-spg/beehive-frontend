import { IconLayer } from 'deck.gl'
import shopIcon from './assets/shop.png'

const ICON_MAPPING = {
	'shop-icon': { x: 0, y: 0, width: 700, height: 600 },
}

const shopLayer = (shops, onHover) => {
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
	return layer(data, onHover)
}

const layer = (data, onHover) => {
	return new IconLayer({
		id: 'layer-shop',
		data,
		iconAtlas: shopIcon,
		iconMapping: ICON_MAPPING,
		pickable: true,
		onHover,
	})
}

export default shopLayer
