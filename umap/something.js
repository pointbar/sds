const fs = require('fs')
const GeoJSON = require('geojson')
const Papa = require('papaparse')

fs.readFile('cities-water-prices.csv', 'utf-8', (err, result) => {
	const cities = Papa.parse(result, {header: true}).data
	const data = addMarkerToCities(cities)
	const dataGeoJson = GeoJSON.parse(data , {Point: ['lat', 'lng']})

	fs.writeFileSync('umap.geojson', JSON.stringify(dataGeoJson, null, 4)) 
})

// FUNCTIONS

function addMarkerToCities (cities) {
	return cities.map(city => {
		const price = +city.description

		city._storage_options = {
			iconClass: 'Drop'
		}

		if (price < 1) {
			city._storage_options.color = 'LimeGreen'
		} else {
			city._storage_options.color = 'DarkRed'
		}

		return city
	})
}