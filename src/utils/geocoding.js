import axios from 'axios'

const addressLookup = geolocation => {
	return new Promise(res => {
		geolocation.getCurrentPosition(async position => {
			const { longitude, latitude } = position.coords
			const converted = await convertCoordsToAddress(longitude, latitude)
			res(converted)
		})
	})
}

const convertCoordsToAddress = async (lng, lat) => {
	const apiKey = process.env.REACT_APP_GOOGLE_API_KEY //eslint-disable-line
	const data = await axios(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`,
	)
	return data.data.results[0]
}

export default addressLookup
