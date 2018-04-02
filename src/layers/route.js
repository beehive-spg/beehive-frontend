import { PathLayer } from 'deck.gl'

const distLayer = (routes, selectedRoute, visible) => {
	const data = routes.map(route => {
		const selected = checkSelected(route, selectedRoute)
			? { color: [64, 124, 209], width: 20 }
			: { color: [151, 45, 7], width: 10 }
		return {
			path: buildPath(route),
			width: selected.width,
			color: selected.color,
		}
	})

	return layer(data, 'dist', visible)
}

const genOrderLayer = (routes, selectedRoute, visible) => {
	const data = routes.map(route => {
		const selected = checkSelected(route, selectedRoute)
			? { color: [64, 124, 209], width: 20 }
			: { color: [255, 137, 68], width: 10 }
		return {
			path: buildPath(route),
			width: selected.width,
			color: selected.color,
		}
	})

	return layer(data, 'gen-order', visible)
}

const userOrderLayer = (routes, selectedRoute) => {
	const data = routes.map(route => {
		const selected = checkSelected(route, selectedRoute)
			? { color: [64, 124, 209], width: 20 }
			: { color: [0, 135, 87], width: 10 }
		return {
			path: buildPath(route),
			width: selected.width,
			color: selected.color,
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

const checkSelected = (route, selectedRoute) => {
	if (selectedRoute) {
		return route.id === selectedRoute.id
	}
	return false
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
