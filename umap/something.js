const fs = require('fs')
const GeoJSON = require('geojson')

const cities = [
  { name: 'Paris', description: '.79', lat: 48.8534, lng: 2.3488 },
  { name: 'Toulouse', description: '6.30', lat: 43.6, lng: 1.433333 },
]

const data = addMarkerToCities(cities)
const dataGeoJson = GeoJSON.parse(data , {Point: ['lat', 'lng']})

fs.writeFileSync('umap.geojson', JSON.stringify(dataGeoJson, null, 4)) 


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