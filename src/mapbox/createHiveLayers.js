import { addHiveLayer } from './layers'

export default (hives, onHover) => {
	const dataInner = hives.map(hive => {
		return hive.data[0]
	})

	const dataOuter = hives.map(hive => {
		return hive.data[1]
	})
	const data = {
		inner: dataInner,
		outer: dataOuter,
	}
	return addHiveLayer(data, onHover)
}
