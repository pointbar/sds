const fs = require('fs')
const GeoJSON = require('geojson')
const Papa = require('papaparse')

fs.readFile('cities-water-prices.csv', 'utf-8', (err, result) => {
	const cities = Papa.parse(result, {header: true}).data
	addCoordsToCities(cities).then(result => {
		result = addMarkerToCities(cities)
		const dataGeoJson = GeoJSON.parse(result , {Point: ['lat', 'lng']})
		fs.writeFileSync('umap.geojson', JSON.stringify(dataGeoJson, null, 4)) 
	})
})

// FUNCTIONS

function addCoordsToCities (cities) {
	return new Promise(function(resolve, reject) {
		fs.readFile('cities.json', 'utf-8', (err, result) => {
			const locations = JSON.parse(result)
			if (err) reject(err)
			resolve(cities.map(city =>
				locations
					.filter((location, idx, arr) =>
						slugify(location.name) === slugify(city.name) &&
						slugify(locations[idx-1].name) !== slugify(city.name))
					.map(location => Object.assign(city, {lat: location.gps_lat, lng: location.gps_lon}))
			))
		})
	})
}

function colorSteps (cities) {
	const priceList = cities.map(city => +city.description)
	const max = Math.max(...priceList)
	const min = Math.min(...priceList)
	const deviation = (max-min)/3

	return {min: min + deviation, max: max - deviation}
}
 
function addMarkerToCities (cities) {
	const {min, max} = colorSteps(cities)

	return cities.map(city => {
		const price = +city.description
		const management = city.gestion

		city._storage_options = {}
console.log('managment', management)
		if (management === 'régie') {
			city._storage_options.iconClass = 'Drop'
		} else {
			city._storage_options.iconClass = 'Ball'
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