var map = L.map('map').fitWorld();

map.setView(new L.LatLng(-12.37, 130.87), 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

var geojson  = {
  "type": "FeatureCollection",
  "features": [
  { "type": "Feature", "id": 0, "properties": { "NAME": "This is Recycable Waste bin" },
  "geometry": { "type": "Point", "coordinates": [130.868995, -12.371374] } }
  ]
  };
  geojsonLayer = L.geoJson(geojson, {
      style: function(feature) {
          return {
          	color: "green"
          };
      },
      pointToLayer: function(feature, latlng) {
          return new L.CircleMarker(latlng, {
          	radius: 10,
          	fillOpacity: 0.85
          });
      },
      onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.NAME);
      }
  });

  map.addLayer(geojsonLayer);


  L.Routing.control({
         waypoints: [
           L.latLng(-12.358181, 130.892576),
           L.latLng(-12.37, 130.87)
         ]
       }).addTo(map);
