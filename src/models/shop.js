const addShops = shops => {
	return shops.map(shop => addShop(shop))
}

const addShop = shop => {
	const { type, location } = shop

	const shopObjects = type.map(obj => {
		return {
			id: obj.id,
			name: obj.name,
		}
	})

	return {
		buildingId: shop.id,
		location: {
			address: location.address,
			longitude: location.longitude,
			latitude: location.latitude,
		},
		shops: shopObjects,
	}
}

export default addShops
