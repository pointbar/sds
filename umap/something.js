const fs = require('fs')

const GeoJSON = require('geojson')

const data = [
  { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
  { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
  { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
]

const dataGeo = GeoJSON.parse(data, {Point: ['lat', 'lng']})

fs.writeFile('umap.geojson', JSON.stringify(dataGeo, null, 4)) 