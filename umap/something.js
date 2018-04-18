const fs = require('fs')

const GeoJSON = require('geojson')

const data = [
  { name: 'Paris', description: 'Prix de l\'eau', _storage_options: {color: 'DarkRed'}, lat: 48.8534, lng: 2.3488 },
  { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
  { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
]

const dataGeo = GeoJSON.parse(data, {Point: ['lat', 'lng']})

fs.writeFile('umap.geojson', JSON.stringify(dataGeo, null, 4)) 