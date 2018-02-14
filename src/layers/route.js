import { PathLayer } from 'deck.gl'

const routeLayer = routes => {
	const data = routes.map(route => {
		if (route.origin === 'order') {
			let path = []
			route.hops.forEach(hop => {
				const start = [
					hop.start.location.longitude,
					hop.start.location.latitude,
				]
				const end = [
					hop.end.location.longitude,
					hop.end.location.latitude,
				]

				path.push(start)
				path.push(end)
			})

			return {
				path: [...path],
				width: 10,
				color: [151, 45, 7],
			}
		}
	})
	return layer(data)
}

const layer = data => {
	return new PathLayer({
		id: 'layer-route',
		data,
		rounded: true,
		getDashArray: () => [3, 10],
	})
}

export default routeLayer
