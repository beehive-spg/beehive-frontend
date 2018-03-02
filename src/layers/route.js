import { PathLayer } from 'deck.gl'

const distLayer = (routes, visible) => {
	const data = routes.map(route => {
		return {
			path: buildPath(route),
			width: 10,
			color: [151, 45, 7],
		}
	})

	return layer(data, 'dist', visible)
}

const genOrderLayer = (routes, visible) => {
	const data = routes.map(route => {
		return {
			path: buildPath(route),
			width: 10,
			color: [255, 137, 68],
		}
	})

	return layer(data, 'gen-order', visible)
}

const userOrderLayer = routes => {
	const data = routes.map(route => {
		return {
			path: buildPath(route),
			width: 10,
			color: [0, 135, 87],
		}
	})

	return layer(data, 'user-order', true)
}

const buildPath = route => {
	let path = []
	route.hops.forEach(hop => {
		const start = [
			hop.start.location.longitude,
			hop.start.location.latitude,
		]
		const end = [hop.end.location.longitude, hop.end.location.latitude]
		path.push(start)
		path.push(end)
	})
	return path
}

const layer = (data, type, visible) => {
	return new PathLayer({
		id: `layer-route-${type}`,
		data,
		visible,
		rounded: true,
		getDashArray: () => [6, 10],
	})
}

export default { distLayer, genOrderLayer, userOrderLayer }
