const fs = require('fs')
const GeoJSON = require('geojson')
const Papa = require('papaparse')


citiesCoordsToMap().then(citiesCoord => {
	fs.readFile('cities-and-water.csv', 'utf-8', (err, citiesCsv) => {
		const citiesJson = Papa.parse(citiesCsv, {header: true}).data
		const citiesCoordsJson = addCoordsToCities(citiesJson, citiesCoord)
		const citiesCoordsMarkersJson = addMarkerToCities(citiesCoordsJson)
		const citiesCoordsMarkersDescrJson = citiesCoordsMarkersJson.map(city => {
			return {
				name: city.name,
				description: `Prix /m3 : ${city.price}  - Gestion : ${city.management}`,
				lat: city.gps_lat,
				lng: city.gps_lon,
				_storage_options: city._storage_options
			}
		})
			
		const citiesGeoJson = GeoJSON.parse(citiesCoordsMarkersDescrJson , {Point: ['lat', 'lng']})
		fs.writeFileSync('umap.geojson', JSON.stringify(citiesGeoJson, null, 4)) 
	})
})

// FUNCTIONS

function citiesCoordsToMap (cities) {
	return new Promise(function(resolve, reject) {
		fs.readFile('source/cities.json', 'utf-8', (err, result) => {
			if (err) reject(err)
			const cities = JSON.parse(result)
			citiesCoords = new Map()
			cities.forEach(city => {
				citiesCoords.set(city.slug, {
					gps_lat: city.gps_lat,
					gps_lon: city.gps_lon,
				})
			})
			resolve(citiesCoords)
		})
	})
}

function addCoordsToCities (cities, citiesCoord) {
	return cities.map(city => Object.assign(city, citiesCoord.get(slugify(city.name))))
}

function colorSteps (cities) {
	const priceList = cities.map(city => +city.price)
	const max = Math.max(...priceList)
	const min = Math.min(...priceList)
	const deviation = (max-min)/3

	return {min: min + deviation, max: max - deviation}
}
 
function addMarkerToCities (cities) {
	const {min, max} = colorSteps(cities)

	return cities.map(city => {
		const price = +city.price
		const management = city.management

		city._storage_options = {}

		if (management === 'régie') {
			city._storage_options.iconClass = 'Drop'
		}
		

		if (price <= min) {
			city._storage_options.color = 'LimeGreen'
		} else if  (price >= max) {
			city._storage_options.color = 'DarkRed'
		} else {
			city._storage_options.color = 'DarkOrange'
		}

		return city
	})
}

function slugify (text) {
	const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
	const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
	const p = new RegExp(a.split('').join('|'), 'g')

	return text.toString().toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(p, c =>
			b.charAt(a.indexOf(c))) // Replace special chars
		.replace(/&/g, '-and-') // Replace & with 'and'
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, '') // Trim - from end of text
}