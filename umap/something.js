const fs = require('fs')
const GeoJSON = require('geojson')

const cities = [
  { name: 'Paris', description: 'Prix de l\'eau', lat: 48.8534, lng: 2.3488 },
  { name: 'Toulouse', description: 'Prix de l\'eau', lat: 43.6, lng: 1.433333 },
]

const data = addMarkerToCities(cities)

const dataGeoJson = GeoJSON.parse(data , {Point: ['lat', 'lng']})

fs.writeFileSync('umap.geojson', JSON.stringify(dataGeoJson, null, 4)) 


// FUNCTIONS

function addMarkerToCities (cities) {
	const umapMarker = {
		"color": "LimeGreen",
		"iconClass": "Drop",
		"zoomTo": 20,
		"showLabel": true,
		"labelHover": true
	}
	
	return cities.map(city => {
		city._storage_options = umapMarker
		return city
	})
}